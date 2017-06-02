import csv
import argparse
import os
import json



def json_valid(json_string):
  try:
    json_object = json.loads(json_string)
  except ValueError:
    return False
  return True

parser = argparse.ArgumentParser()


parser.add_argument('-d', '--data', help='Path to the dataset', required=True)
parser.add_argument('-p', '--params', help='Path to the params JSON', required=True)
parser.add_argument('-i', '--toloka_uid', help='Toloka Disk UID', required=True)

args = vars(parser.parse_args())

data_path = args['data']
params_path = args['params']
uid = args['toloka_uid']

with open('tasks.tsv', 'w') as csvfile, open(params_path, 'r') as json_params:

    json_string = ''.join(json_params.readlines())

    if json_valid(json_string):
        json_str_proc = (''.join([l.strip() for l in json_params.readlines()])).replace('"', '\\')

        fieldnames = ['INPUT:image_rel', 'INPUT:json_params', 'GOLDEN:result']
        writer = csv.DictWriter(csvfile, delimiter='\t',fieldnames=fieldnames)

        writer.writeheader()

        # Go through each file in a directory
        for filename in os.listdir(data_path):
            writer.writerow({fieldnames[0]: '/{}/{}'.format(uid, filename), fieldnames[1]: json_str_proc, fieldnames[2]: 'true'})
    else:
        raise ValueError('json with classes and params at {} has invalid format'.format(params_path))
