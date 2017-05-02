import csv
import argparse
import os

parser = argparse.ArgumentParser()


parser.add_argument('-p', '--path', help='Path to the results TSV from Yandex Toloka', required=True)

args = vars(parser.parse_args())

data_path = args['path']

with open(data_path, 'r') as inpt, open('results.csv', 'w') as results:

    fieldnames = ['input_file', 'labels']
    writer = csv.DictWriter(results,fieldnames=fieldnames)

    writer.writeheader()

    reader = csv.reader(inpt, delimiter='\t')
    next(reader, None)  # skip the headers

    [writer.writerow({fieldnames[0]: row[0], fieldnames[1]: row[2]}) for row in reader if len(row[0]) > 0]
