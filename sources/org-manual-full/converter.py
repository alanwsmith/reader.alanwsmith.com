#!/usr/bin/env python3

import json
import re

from bs4 import BeautifulSoup

source_path = 'manual.html'
output_path = 'parsed_1.html'
output_json = 'output.json'

payload = {
    "pages": []
}


with open(source_path) as _html:
    file_data = _html.read()

    new_data = re.sub(r'<div class="header">.*?</div>', '', file_data, flags=re.DOTALL)
    new_data = re.sub(r'<table class="menu".*?</table>', '', new_data, flags=re.DOTALL)

    sections = new_data.split('<hr>')

    for section in sections:
        matches = re.search(r'<h\d class=".*?">(.*?)</h', section)
        if matches:
            slug = re.sub(r'\W', '', matches[1])
            payload['pages'].append(
                {
                    "id": slug,
                    "content": section
                }
            )

    with open(output_json, 'w') as _out:
        json.dump(payload, _out)


    # soup = BeautifulSoup(_html, 'html.parser')
    # h3_sections = soup.find_all('h3')
    # for h3_section in h3_sections:
    #     print(h3_section.string)

print("done")




