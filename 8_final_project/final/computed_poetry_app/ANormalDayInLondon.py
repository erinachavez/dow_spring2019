from flask import Blueprint

andil_blueprint = Blueprint('a_normal_day_in_london', __name__)

import json
import pronouncing
import random
import tracery
from tracery.modifiers import base_english


def get_all_stations(file):
    all_stations = []

    for station in file["stations"]:
        all_stations.append(station["name"])

    return all_stations

def get_directions(start, end, all_shuffled_stations, file):
    directions = {}
    for station in file["stations"]:
        if station["name"] == start:
            start_lines = station["lines"]

        if station["name"] == end:
            end_lines = station["lines"]

    directions["start"] = start

    while len(directions) == 1:
        next_line = random.choice(start_lines)
        stations = all_shuffled_stations[next_line]

        not_found = True
        for this_station in stations:
            if not_found:
                for station in file["stations"]:
                    if not_found:
                        if station["name"] == this_station:
                            this_station_lines = station["lines"]

                            for line in this_station_lines:
                                if not_found:
                                    if line in end_lines:
                                        directions["first_line"] = next_line
                                        directions["transfer_station"] = this_station
                                        directions["second_line"] = line

                                        not_found = False


    directions["end"] = end

    return directions

def get_rhyme(word):
    phones = pronouncing.phones_for_word(word)
    phone_parts = pronouncing.rhyming_part(phones[0])
    rhymes = pronouncing.search(phone_parts + "$")

    # ensures rhyming word is not the same as given word
    rhyme = word.lower()
    while rhyme == word.lower():
        rhyme = random.choice(rhymes)

    return rhyme

def get_fortune(word, fortunes, actions):
    phones = pronouncing.phones_for_word(word)
    phone_parts = pronouncing.rhyming_part(phones[0])
    rhymes = pronouncing.search(phone_parts + "$")

    for fortune in fortunes:
        last_word = fortune.split(" ")[-1]
        if last_word in rhymes:
            return fortune, "fortune"

    for action in actions:
        last_word = action.split(" ")[-1]
        if last_word in rhymes:
            return action, "action"

    return "Sorry!", "error"

def plural(word):
    if word[-1] in "shxSHX":
        return word + "es"

    elif word[-1] in "yY":
        if word[-2] not in "aeiouAEIOU":
            return word[:-1] + "ies"
        else:
            return word + "s"

    else:
        return word + "s"

def generate_poem(directions, weathers, venues, occupations, body_parts, objects, verbs, passages, adjectives, movement_verbs, prepositions, nouns, adverbs, moods, pre_fortune, i_saw, fortunes, actions, sight_verbs, then_it, it_found):
    # poem constants
    weather = random.choice(weathers)

    if weather[-1] == "s":
        is_are = "are"
    else:
        is_are = "is"

    version = random.randint(0,2)
    venue = random.choice(venues)
    occupation = random.choice(occupations)
    body_part = random.choice(body_parts)
    object = random.choice(objects)
    object_verb = plural(random.choice(verbs))
    passage = random.choice(passages)

    # rhymes
    start_split = directions["start"].split(" ")
    rhyme_s1 = get_rhyme(start_split[-1])

    if version == 0:
        rhyme_s2 = get_rhyme("past")
    elif version == 1:
        rhyme_s2 = get_rhyme(body_part)
    elif version == 2:
        rhyme_s2 = get_rhyme(object_verb)

    end_split = directions["end"].split(" ")
    fortune, fortune_type = get_fortune(end_split[-1], fortunes, actions)
    if fortune_type == "action":
        fortune = fortune.lower()
        fortune = "You are " + fortune
    elif fortune_type == "error":
        fortune = get_rhyme(end_split[-1])
        fortune = random.choice(pre_fortune) + fortune + "?"

    rhyme_s3 = get_rhyme(end_split[-1])

    poem_rules = {
        'origin': '''
            <p id="poem">
                In London, the #weather.lowercase# #is_are# #adjective#<br />
                I #movement_verb# #preposition# the #thing# and #verb# into #start#<br />
                #adverb.capitalize#, I #movement_verb# onto the #first_line# line<br />
                My #mood# #adverb# #rhyme_s1#<br />
                <br />
                I transferred at #transfer_station#<br />
                #i_saw#<br />
                I #sight_verb# #passage.a# #preposition# the #second_line# line car<br />
                #then_it#<br />
                <br />
                #verb.capitalize#ing into the #passage#<br />
                I am #preposition# #end#<br />
                #it_found#<br />
                "#fortune#"<br />
                The #weather.lowercase# now feels #rhyme_s3#
            </p>
        ''',

        'weather': [weather],
        'is_are': [is_are],
        'adjective': adjectives,
        'movement_verb': movement_verbs,
        'preposition': prepositions,
        'thing': objects + venues + nouns,
        'verb': verbs,
        'start': [directions["start"]],
        'adverb': adverbs,
        'first_line': [directions["first_line"]],
        'mood': moods,
        'rhyme_s1': [rhyme_s1],
        'transfer_station': [directions["transfer_station"]],
        'venue': [venue],
        'occupation': [occupation],
        'body_part': [body_part],
        'object': [object],
        'object_verb': [object_verb],
        'i_saw': [i_saw[version]],
        'sight_verb': sight_verbs,
        'passage': [passage],
        'second_line': [directions["second_line"]],
        'rhyme_s2': [rhyme_s2],
        'then_it': [then_it[version]],
        'end': [directions["end"]],
        'now_suddenly': ["now", "suddenly"],
        'found_followed': ["found", "followed"],
        'it_found': [it_found[version]],
        'fortune': [fortune],
        'rhyme_s3': [rhyme_s3]
    }
    poem_grammar = tracery.Grammar(poem_rules)
    poem_grammar.add_modifiers(base_english)
    return poem_grammar.flatten("#origin#")

def organize_stations(file):
    stationsbyline = {}
    for station in file["stations"]:
        for line in station["lines"]:
            if line not in stationsbyline:
                stationsbyline[line] = [station["name"]]
            else:
                stationsbyline[line].append(station["name"])

    return stationsbyline

def shuffle_all_stations(stationsbyline):
    all_shuffled_stations = {}

    for line in list(stationsbyline.keys()):
        stations = stationsbyline[line]

        shuffled_stations = []
        for i in range(len(stations)):
            station = random.choice(stations)
            shuffled_stations.append(station)
            stations.pop(stations.index(station))

        all_shuffled_stations[line] = shuffled_stations

    return all_shuffled_stations

def get_all_points(all_shuffled_stations, width, height, station_distance):
    all_points = {}
    all_points_stations = {}

    for line in all_shuffled_stations:
        points = {}

        cur_x = random.randint(0, width)
        cur_y = random.randint(0, height)

        for station in all_shuffled_stations[line]:
            if station in all_points_stations:
                points[station] = (all_points_stations[station][0], all_points_stations[station][1])

                cur_x = all_points_stations[station][0]
                cur_y = all_points_stations[station][1]

            else:
                low_x = cur_x - station_distance
                high_x = cur_x + station_distance
                low_y = cur_y - station_distance
                high_y = cur_y + station_distance

                # pixel buffer of 7 ensures station points aren't cut off
                if low_x < 7:
                    low_x = 7
                if high_x > width-7:
                    high_x = width-7
                if low_y < 7:
                    low_y = 7
                if high_y > height-7:
                    high_y = height-7

                x = random.randint(low_x, high_x)
                y = random.randint(low_y, high_y)

                points[station] = (x,y)

                cur_x = x
                cur_y = y

        all_points[line] = points

        for line in all_points:
            for station in all_points[line]:
                all_points_stations[station] = all_points[line][station]

    return all_points

def build_all_html(width, height, all_points, start, end, STATION_COLORS, poem):
    all_ellipses = ""
    all_points_str = []
    all_lines = []

    # draw all ellipses at station points
    for points in all_points:
        points_str = ""

        for key, value in all_points[points].items():
            rules = {
                'origin': '<ellipse id="#tag#" class="#line#" cx="#cx#" cy="#cy#" rx="5" ry="5" />',
                'tag': [key],
                'cx': [str(value[0])],
                'cy': [str(value[1])],
                'line': [points.replace(" ","_")],
            }

            grammar = tracery.Grammar(rules)
            all_ellipses += grammar.flatten("#origin#")

            points_str += str(value[0]) + "," + str(value[1]) + " "

        all_points_str.append(points_str)
        all_lines.append(points.replace(" ","_"))

    # iterate over lines to get line checkboxes and polygons
    line_inputs = ""
    polygon_divs = ""

    for line in all_lines:
        checked = "checked"

        line_rules = {
            'origin': '<input type="checkbox" class="legend" id="#line#" #checked#><label for="#line#">#line_text#</label>',
            'line': [line],
            'line_text': [line.replace("_"," ").replace("and", "&amp;")],
            'checked': [checked]
        }
        line_grammar = tracery.Grammar(line_rules)
        line_inputs += line_grammar.flatten("#origin#")

        polygon_rules = {
            'origin': '<polygon class="#line#" points="#points#" style="stroke: #stroke#;" />',
            'line': [line],
            'points': [all_points_str[all_lines.index(line)]],
            'stroke': [STATION_COLORS[line]],
        }
        polygon_grammar = tracery.Grammar(polygon_rules)
        polygon_divs += polygon_grammar.flatten("#origin#")

    # HTML page
    rules = {
        'origin': '''
            <h1>London Underground Map</h1>
            <p class="station"></p>
            #lines#
            <svg width="#width#" height="#height#">#polygons##all_ellipses#</svg>
            #poem#
        ''',
        'width': [width],
        'height': [height],
        'lines': [line_inputs],
        'polygons': [polygon_divs],
        'poem': [poem],
        'all_ellipses': [all_ellipses]
    }

    grammar = tracery.Grammar(rules)
    return grammar.flatten("#origin#")

@andil_blueprint.route('/a_normal_day_in_london')
def a_normal_day_in_london():
    # weather
    weathers = json.loads(open("assets/weather_conditions.json").read())["conditions"]

    # adjective
    adjectives = json.loads(open("assets/adjs.json").read())["adjs"]
    adjectives += json.loads(open("assets/adjs2.json").read())["adjs"]

    colors = json.loads(open("assets/xkcd.json").read())["colors"]

    for color in colors:
        adjectives.append(color["color"])

    # movement_verbs
    movement_verbs = ['boarded', 'hopped', 'climbed', 'stepped', 'ran', 'jumped', 'shimmied', 'got', 'entered', 'embarked', 'burst', 'bounded', 'leapt', 'sprung', 'walked', 'scrambled', 'strode', 'moved', 'sprinted', 'darted', 'dashed', 'turned', 'crossed']

    # prepositions
    prepositions = json.loads(open("assets/prepositions.json").read())["prepositions"]

    # objects
    objects = json.loads(open("assets/objects.json").read())["objects"]

    # venues
    venues_file = json.loads(open("assets/venues.json").read())

    venues = []
    for category in venues_file["categories"]:
        for venue in category["categories"]:
            venues.append(venue["name"])

            if "categories" in venue:
                for venue2 in venue["categories"]:
                    venues.append(venue2["name"])

    # nouns
    nouns = json.loads(open("assets/nouns.json").read())["nouns"]
    nouns += json.loads(open("assets/nouns2.json").read())["nouns"]

    # verbs
    verbs_file = json.loads(open("assets/verbs.json").read())["verbs"]

    verbs = []
    for verb in verbs_file:
        verbs.append(verb["present"])

    verbs += json.loads(open("assets/ergative_verbs.json").read())["ergative_verbs"]
    verbs += json.loads(open("assets/infinitive_verbs.json").read())

    # adverbs
    adverbs = json.loads(open("assets/adverbs.json").read())["adverbs"]

    # moods
    moods = json.loads(open("assets/moods.json").read())["moods"]

    # occupations
    occupations = json.loads(open("assets/occupations.json").read())["occupations"]

    # body_parts
    body_parts = json.loads(open("assets/bodyParts.json").read())["bodyParts"]

    # sight_verbs
    sight_verbs = ['see', 'spot', 'notice', 'find', 'observe', 'identify', 'glimpse', 'discern', 'perceive', 'catch site of', 'make out', 'pick out', 'distinguish', 'recognize', 'detect', 'note', 'behold', 'observe', 'view', 'discover', 'encounter']

    # passages
    passages = json.loads(open("assets/passages.json").read())["passages"]

    # pre_fortune\
    pre_fortune = ["Who are you to ", "What does it mean to ", "Why must you ", "How can you ", "When will you ", "Where do you "]

    # fortunes + actions
    deck = json.loads(open("assets/tarot_interpretations.json").read())["tarot_interpretations"]

    fortunes = []
    actions = []

    for card in deck:
        for fortune in card["fortune_telling"]:
            fortunes.append(fortune)
        for light in card["meanings"]["light"]:
            actions.append(light)
        for shadow in card["meanings"]["shadow"]:
            actions.append(shadow)

    # i_saw
    i_saw = ['#venue.a.capitalize# #verb.ed# past', '#occupation.a.capitalize# with #adjective.a# #body_part#', '#adjective.a.capitalize# #object# #object_verb#']

    # then_it
    then_it = ['The #venue# now #rhyme_s2#', 'The #occupation# #rhyme_s2#', 'The #object# #rhyme_s2#']

    # it_found
    it_found = ['#now_suddenly.capitalize# inside the #venue#, I hear', 'The #occupation# #found_followed# me and says', 'The #object# #found_followed# me and says']

    # constants
    WIDTH = 1200
    HEIGHT = 650

    STATION_COLORS = {
        "Bakerloo": "rgb(176, 93, 16)",
        "Central": "rgb(237, 46, 36)",
        "Circle": "rgb(252, 207, 5)",
        "District": "rgb(0, 130, 59)",
        "Hammersmith_and_City": "rgb(242, 136, 161)",
        "Jubilee": "rgb(149, 156, 161)",
        "Metropolitan": "rgb(150, 2, 93)",
        "Northern": "rgb(33, 30, 30)",
        "Piccadilly": "rgb(28, 64, 148)",
        "Victoria": "rgb(7, 159, 219)",
        "Waterloo_and_City": "rgb(133, 204, 187)",
    }

    STATION_DISTANCE = 175

    # put it all together
    file = json.loads(open("assets/london_underground_stations.json").read())
    all_stations = get_all_stations(file)
    stationsbyline = organize_stations(file)

    start = random.choice(all_stations)
    end = start
    # This ensures start and end station are different
    while start == end:
        end = random.choice(all_stations)

    all_shuffled_stations = shuffle_all_stations(stationsbyline)
    directions = get_directions(start, end, all_shuffled_stations, file)

    all_points = get_all_points(all_shuffled_stations, WIDTH, HEIGHT, STATION_DISTANCE)

    # Poem
    poem = generate_poem(directions, weathers, venues, occupations, body_parts, objects, verbs, passages, adjectives, movement_verbs, prepositions, nouns, adverbs, moods, pre_fortune, i_saw, fortunes, actions, sight_verbs, then_it, it_found)

    # Map
    html = build_all_html(str(WIDTH), str(HEIGHT), all_points, directions["first_line"], directions["second_line"], STATION_COLORS, poem)

    return html
