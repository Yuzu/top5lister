import sys
import json
import csv


def parseFileToJson(path):
	data = []
	with open(path, "r") as f:

		reader = csv.DictReader(f)

		for row in reader:
			data.append(row)

	with open("studentlists.json", "w") as f:
		f.write(json.dumps(data, indent=4))


def createDocs():
	users = []
	lists = []
	community = {"animals to eat": None,
				"books": None,
				"countries you'd like to visit": None,
				"foods": None,
				"games": None,
				"movies": None,
				"pink floyd songs": None,
				"programming languages": None,
				"professional sports teams": None,
				"tv shows": None
				}
	
	for field in community.keys():
		community[field] = {"name": field.lower(),
						"items": [],
						"comments": [],
						"views": 0,
						"upvotes": [],
						"downvotes": [],
						"pooledListNum": 0,
						"updatedAt": "2021-11-28T16:44:41.509+00:00"
						}


	with open("studentlists.json", "r") as f:
		data = json.load(f)
		for entry in data:
			if entry["First Name"] == "":
				continue

			
			newUser = {"firstName": entry["First Name"],
						"lastName": entry["Last Name"],
						"username": entry["Account Name"],
						"email": entry["Fake Email"],
						"passwordHash": "$2a$10$RhMr6.62aBAEcvkEVIFp9eo4KT69nq87sfFwVEQ2JbwNPWQ3uYXmy"
					   }

			users.append(newUser)

			for field in entry.keys():

				if field == "Net ID" or field == "First Name" or field == "Last Name" or field == "Account Name" or field == "Fake Email" or entry[field] == "":
					continue
				
				newList = {"name": field.lower(),
						"items": [x.strip().lower() for x in entry[field].split(",")],
						"ownerEmail": newUser["email"],
						"ownerUsername": newUser["username"],
						"comments": [],
						"views": 0,
						"upvotes": [],
						"downvotes": [],
						"publishDate": "2021-11-28T16:44:41.509+00:00"
						}
				lists.append(newList)

				# update community list
				current = community[field.lower()]
				current["pooledListNum"] += 1

				for i, item in enumerate(newList["items"]):
					if item in [x["name"] for x in current["items"]]:
						for communityEntry in current["items"]:
							if communityEntry["name"] == item:
								communityEntry["votes"] += (5 - i)
					else:
						current["items"].append({"name": item, "votes": (5-i)})

				community[field.lower()] = current

	with open("users.json", "w") as f:
		f.write(json.dumps(users, indent=4))
	
	with open("lists.json", "w") as f:
		f.write(json.dumps(lists, indent=4))
	
	with open("community.json", "w") as f:
		communityLists = [community[name] for name in community.keys()]
		for list in communityLists:
			list["items"] = sorted(list["items"], key=lambda x: x["votes"], reverse=True)
		f.write(json.dumps(communityLists, indent=4))

def main():
	parseFileToJson(sys.argv[1])
	createDocs()



if __name__ == "__main__":
	main()