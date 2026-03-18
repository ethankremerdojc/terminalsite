#!/usr/bin/env python3
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from urllib.request import Request, urlopen
from urllib.error import URLError
from datetime import datetime
import json

import os, ssl

LISTEN_HOST = "127.0.0.1"
LISTEN_PORT = 9000

GOTIFY_TOKEN = os.environ["GOTIFY_TOKEN"]

OUTPUT_FILE = "/home/ethan/gotify/contact_submissions.txt"

GOTIFY_URL = f"http://127.0.0.1:8007/message?token={GOTIFY_TOKEN}"

class ContactHandler(BaseHTTPRequestHandler):
    def do_POST(self):

        if self.path != "/contact":
            self.send_error(404, "Not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length).decode("utf-8", errors="replace")
            form = parse_qs(raw_body)

            email = form.get("email", [""])[0].strip()
            notes = form.get("notes", [""])[0].strip()
            now = datetime.utcnow().isoformat() + "Z"

            print("Email: ", email, "Notes: ", notes)

            log_entry = (
                f"TIME: {now}\n"
                f"EMAIL: {email}\n"
                f"NOTES: {notes}\n"
                f"{'-' * 40}\n"
            )

            with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
                f.write(log_entry)

            push_message = {
                "title": "New contact form submission",
                "message": f"Email: {email}\nNotes: {notes[:300]}",
                "priority": 5
            }

            req = Request(
                GOTIFY_URL,
                data=json.dumps(push_message).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )

            urlopen(req, timeout=5).read()

            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"Thank you for your submission! I will get back to you as soon as I can.")
        except URLError as e:
            self.send_error(500, f"Gotify push failed: {e}")
        except Exception as e:
            raise e
            self.send_error(500, f"Server error: {e}")

    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    server = HTTPServer((LISTEN_HOST, LISTEN_PORT), ContactHandler)
    print(f"Listening on http://{LISTEN_HOST}:{LISTEN_PORT}")
    server.serve_forever()
