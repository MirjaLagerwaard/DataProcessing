#!/usr/bin/env python
# Name: Mirja Lagerwaard
# Student number: 10363149

import csv
import json

csvfile = open('cat_population.csv', 'r')
jsonfile = open('file.json', 'w')

fieldnames = ("Country","Cat Population")
reader = csv.DictReader(csvfile, fieldnames)
points = []

for row in reader:
    points.append(row)

points_dict = {'points' : points}
json.dump(points_dict, jsonfile)
