#!/usr/bin/python

import json
from pprint import pprint
import urllib.request

in_filename = 'original/artists_orig.json'
out_filename ='artists.json'
json_data=open(in_filename)
list = json.load(json_data)
count = 1;
for data in list:
  posterURL = data["poster"]
  print("fetching " + posterURL + "...")
  filename = "artist_" + str(count) +".png"
  #urllib.request.urlretrieve(posterURL,filename)
  data["poster"] = "artists/" + filename
  large_poster = data['poster_large']
  print("fetching " + large_poster + "...")
  filename = "artist_large_" + str(count) + ".jpg"
  #urllib.request.urlretrieve(large_poster,filename)
  data["poster_large"] = "artists/" +filename
  count = count + 1
	
with open(out_filename, 'w') as outfile:
	json.dump(list, outfile)
	