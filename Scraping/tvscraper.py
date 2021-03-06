#!/usr/bin/env python
# Name: Mirja Lagerwaard
# Student number: 10363149

'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM
import pattern.web as web

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    tv_list = []

    for movie in dom.by_tag('div.lister-item mode-advanced'):
        title = movie.by_tag('a')[1].content
        rating = movie.by_tag('strong')[0].content

        # grab the string from the second character, because the first two characters are /n
        genre_unstripped = movie.by_tag('span.genre')[0].content[1:]
        # get rid of the extra white space at the end of the string
        genre = genre_unstripped.strip()

        stars_list = ""
        stars = movie.by_tag('p')[2]
        # iterates over the <a> tags of every actor/actress
        for element in stars.by_tag('a'):
            # store the content of the <a> tags in the string stars_list
            stars_list += element.content.encode('utf-8')

        runtime = movie.by_tag('span.runtime')[0].content
        # split the string 'runtime' to store only the number
        number_runtime = runtime.split()[0]

        # store the extracted information in the array tv_list
        # because it deletes each utf-8 character you need to specify this 
        tv_list.append([title.encode('utf-8'), rating.encode('utf-8'), genre.encode('utf-8'), stars_list, number_runtime.encode('utf-8')])

    return tv_list

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    for row in tvseries:
        writer.writerow(row)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
