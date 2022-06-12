#!/usr/bin/env python3

import re

from bs4 import BeautifulSoup

source_path = 'manual.html'
output_path = 'parsed_1.html'

with open(source_path) as _html:
    file_data = _html.read()

    new_data = re.sub(r'<div class="header">.*?</div>', '', file_data, flags=re.DOTALL)
    new_data = re.sub(r'<table class="menu".*?</table>', '', new_data, flags=re.DOTALL)


    with open(output_path, 'w') as _out:
        _out.write(new_data)


    # soup = BeautifulSoup(_html, 'html.parser')
    # h3_sections = soup.find_all('h3')
    # for h3_section in h3_sections:
    #     print(h3_section.string)

print("done")




