# -*- coding: utf-8 -*-

import random

# Source: https://github.com/dariusk/corpora/blob/master/data/humans/firstNames.json
first_names = [
    "Jacob",
    "Michael",
    "Joshua",
    "Matthew",
    "Daniel",
    "Christopher",
    "Andrew",
    "Ethan",
    "Joseph",
    "William",
    "Anthony",
    "David",
    "Alexander",
    "Nicholas",
    "Ryan",
    "Tyler",
    "James",
    "John",
    "Jonathan",
    "Noah",
    "Brandon",
    "Christian",
    "Dylan",
    "Samuel",
    "Benjamin",
    "Nathan",
    "Zachary",
    "Logan",
    "Justin",
    "Gabriel",
    "Jose",
    "Austin",
    "Kevin",
    "Elijah",
    "Caleb",
    "Robert",
    "Thomas",
    "Jordan",
    "Cameron",
    "Jack",
    "Hunter",
    "Jackson",
    "Angel",
    "Isaiah",
    "Evan",
    "Isaac",
    "Luke",
    "Mason",
    "Jason",
    "Jayden",
    "Gavin",
    "Aaron",
    "Connor",
    "Aiden",
    "Aidan",
    "Kyle",
    "Juan",
    "Charles",
    "Luis",
    "Adam",
    "Lucas",
    "Brian",
    "Eric",
    "Adrian",
    "Nathaniel",
    "Sean",
    "Alex",
    "Carlos",
    "Ian",
    "Bryan",
    "Owen",
    "Jesus",
    "Landon",
    "Julian",
    "Chase",
    "Cole",
    "Diego",
    "Jeremiah",
    "Steven",
    "Sebastian",
    "Xavier",
    "Timothy",
    "Carter",
    "Wyatt",
    "Brayden",
    "Blake",
    "Hayden",
    "Devin",
    "Cody",
    "Richard",
    "Seth",
    "Dominic",
    "Jaden",
    "Antonio",
    "Miguel",
    "Liam",
    "Patrick",
    "Carson",
    "Jesse",
    "Tristan",
    "Alejandro",
    "Henry",
    "Victor",
    "Trevor",
    "Bryce",
    "Jake",
    "Riley",
    "Colin",
    "Jared",
    "Jeremy",
    "Mark",
    "Caden",
    "Garrett",
    "Parker",
    "Marcus",
    "Vincent",
    "Kaleb",
    "Kaden",
    "Brady",
    "Colton",
    "Kenneth",
    "Joel",
    "Oscar",
    "Josiah",
    "Jorge",
    "Cooper",
    "Ashton",
    "Tanner",
    "Eduardo",
    "Paul",
    "Edward",
    "Ivan",
    "Preston",
    "Maxwell",
    "Alan",
    "Levi",
    "Stephen",
    "Grant",
    "Nicolas",
    "Omar",
    "Dakota",
    "Alexis",
    "George",
    "Collin",
    "Eli",
    "Spencer",
    "Gage",
    "Max",
    "Cristian",
    "Ricardo",
    "Derek",
    "Micah",
    "Brody",
    "Francisco",
    "Nolan",
    "Ayden",
    "Dalton",
    "Shane",
    "Peter",
    "Damian",
    "Jeffrey",
    "Brendan",
    "Travis",
    "Fernando",
    "Peyton",
    "Conner",
    "Andres",
    "Javier",
    "Giovanni",
    "Shawn",
    "Braden",
    "Jonah",
    "Bradley",
    "Cesar",
    "Emmanuel",
    "Manuel",
    "Edgar",
    "Mario",
    "Erik",
    "Edwin",
    "Johnathan",
    "Devon",
    "Erick",
    "Wesley",
    "Oliver",
    "Trenton",
    "Hector",
    "Malachi",
    "Jalen",
    "Raymond",
    "Gregory",
    "Abraham",
    "Elias",
    "Leonardo",
    "Sergio",
    "Donovan",
    "Colby",
    "Marco",
    "Bryson",
    "Martin",
    "Emily",
    "Madison",
    "Emma",
    "Olivia",
    "Hannah",
    "Abigail",
    "Isabella",
    "Samantha",
    "Elizabeth",
    "Ashley",
    "Alexis",
    "Sarah",
    "Sophia",
    "Alyssa",
    "Grace",
    "Ava",
    "Taylor",
    "Brianna",
    "Lauren",
    "Chloe",
    "Natalie",
    "Kayla",
    "Jessica",
    "Anna",
    "Victoria",
    "Mia",
    "Hailey",
    "Sydney",
    "Jasmine",
    "Julia",
    "Morgan",
    "Destiny",
    "Rachel",
    "Ella",
    "Kaitlyn",
    "Megan",
    "Katherine",
    "Savannah",
    "Jennifer",
    "Alexandra",
    "Allison",
    "Haley",
    "Maria",
    "Kaylee",
    "Lily",
    "Makayla",
    "Brooke",
    "Nicole",
    "Mackenzie",
    "Addison",
    "Stephanie",
    "Lillian",
    "Andrea",
    "Zoe",
    "Faith",
    "Kimberly",
    "Madeline",
    "Alexa",
    "Katelyn",
    "Gabriella",
    "Gabrielle",
    "Trinity",
    "Amanda",
    "Kylie",
    "Mary",
    "Paige",
    "Riley",
    "Leah",
    "Jenna",
    "Sara",
    "Rebecca",
    "Michelle",
    "Sofia",
    "Vanessa",
    "Jordan",
    "Angelina",
    "Caroline",
    "Avery",
    "Audrey",
    "Evelyn",
    "Maya",
    "Claire",
    "Autumn",
    "Jocelyn",
    "Ariana",
    "Nevaeh",
    "Arianna",
    "Jada",
    "Bailey",
    "Brooklyn",
    "Aaliyah",
    "Amber",
    "Isabel",
    "Mariah",
    "Danielle",
    "Melanie",
    "Sierra",
    "Erin",
    "Molly",
    "Amelia",
    "Isabelle",
    "Madelyn",
    "Melissa",
    "Jacqueline",
    "Marissa",
    "Shelby",
    "Angela",
    "Leslie",
    "Katie",
    "Jade",
    "Catherine",
    "Diana",
    "Aubrey",
    "Mya",
    "Amy",
    "Briana",
    "Sophie",
    "Gabriela",
    "Breanna",
    "Gianna",
    "Kennedy",
    "Gracie",
    "Peyton",
    "Adriana",
    "Christina",
    "Courtney",
    "Daniela",
    "Lydia",
    "Kathryn",
    "Valeria",
    "Layla",
    "Alexandria",
    "Natalia",
    "Angel",
    "Laura",
    "Charlotte",
    "Margaret",
    "Cheyenne",
    "Mikayla",
    "Miranda",
    "Naomi",
    "Kelsey",
    "Payton",
    "Ana",
    "Alicia",
    "Jillian",
    "Daisy",
    "Mckenzie",
    "Ashlyn",
    "Sabrina",
    "Caitlin",
    "Summer",
    "Ruby",
    "Rylee",
    "Valerie",
    "Skylar",
    "Lindsey",
    "Kelly",
    "Genesis",
    "Zoey",
    "Eva",
    "Sadie",
    "Alexia",
    "Cassidy",
    "Kylee",
    "Kendall",
    "Jordyn",
    "Kate",
    "Jayla",
    "Karen",
    "Tiffany",
    "Cassandra",
    "Juliana",
    "Reagan",
    "Caitlyn",
    "Giselle",
    "Serenity",
    "Alondra",
    "Lucy",
    "Bianca",
    "Kiara",
    "Crystal",
    "Erica",
    "Angelica",
    "Hope",
    "Chelsea",
    "Alana",
    "Liliana",
    "Brittany",
    "Camila",
    "Makenzie",
    "Lilly",
    "Veronica",
    "Abby",
    "Jazmin",
    "Adrianna",
    "Delaney",
    "Karina",
    "Ellie",
    "Jasmin"
]

# Source: https://github.com/dariusk/corpora/blob/master/data/humans/lastNames.json
last_names = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
    "Martin",
    "Jackson",
    "Thompson",
    "White",
    "Lopez",
    "Lee",
    "Gonzalez",
    "Harris",
    "Clark",
    "Lewis",
    "Robinson",
    "Walker",
    "Perez",
    "Hall",
    "Young",
    "Allen",
    "Sanchez",
    "Wright",
    "King",
    "Scott",
    "Green",
    "Baker",
    "Adams",
    "Nelson",
    "Hill",
    "Ramirez",
    "Campbell",
    "Mitchell",
    "Roberts",
    "Carter",
    "Phillips",
    "Evans",
    "Turner",
    "Torres",
    "Parker",
    "Collins",
    "Edwards",
    "Stewart",
    "Flores",
    "Morris",
    "Nguyen",
    "Murphy",
    "Rivera",
    "Cook",
    "Rogers",
    "Morgan",
    "Peterson",
    "Cooper",
    "Reed",
    "Bailey",
    "Bell",
    "Gomez",
    "Kelly",
    "Howard",
    "Ward",
    "Cox",
    "Diaz",
    "Richardson",
    "Wood",
    "Watson",
    "Brooks",
    "Bennett",
    "Gray",
    "James",
    "Reyes",
    "Cruz",
    "Hughes",
    "Price",
    "Myers",
    "Long",
    "Foster",
    "Sanders",
    "Ross",
    "Morales",
    "Powell",
    "Sullivan",
    "Russell",
    "Ortiz",
    "Jenkins",
    "Gutierrez",
    "Perry",
    "Butler",
    "Barnes",
    "Fisher",
    "Henderson",
    "Coleman",
    "Simmons",
    "Patterson",
    "Jordan",
    "Reynolds",
    "Hamilton",
    "Graham",
    "Kim",
    "Gonzales",
    "Alexander",
    "Ramos",
    "Wallace",
    "Griffin",
    "West",
    "Cole",
    "Hayes",
    "Chavez",
    "Gibson",
    "Bryant",
    "Ellis",
    "Stevens",
    "Murray",
    "Ford",
    "Marshall",
    "Owens",
    "Mcdonald",
    "Harrison",
    "Ruiz",
    "Kennedy",
    "Wells",
    "Alvarez",
    "Woods",
    "Mendoza",
    "Castillo",
    "Olson",
    "Webb",
    "Washington",
    "Tucker",
    "Freeman",
    "Burns",
    "Henry",
    "Vasquez",
    "Snyder",
    "Simpson",
    "Crawford",
    "Jimenez",
    "Porter",
    "Mason",
    "Shaw",
    "Gordon",
    "Wagner",
    "Hunter",
    "Romero",
    "Hicks",
    "Dixon",
    "Hunt",
    "Palmer",
    "Robertson",
    "Black",
    "Holmes",
    "Stone",
    "Meyer",
    "Boyd",
    "Mills",
    "Warren",
    "Fox",
    "Rose",
    "Rice",
    "Moreno",
    "Schmidt",
    "Patel",
    "Ferguson",
    "Nichols",
    "Herrera",
    "Medina",
    "Ryan",
    "Fernandez",
    "Weaver",
    "Daniels",
    "Stephens",
    "Gardner",
    "Payne",
    "Kelley",
    "Dunn",
    "Pierce",
    "Arnold",
    "Tran",
    "Spencer",
    "Peters",
    "Hawkins",
    "Grant",
    "Hansen",
    "Castro",
    "Hoffman",
    "Hart",
    "Elliott",
    "Cunningham",
    "Knight",
    "Bradley"
]

job_titles = {
    "flesh_act1": [
        "engineer",
        "private",
    ],

    "flesh_act2": [
        "prisoner",
        "junior manager",
        "passenger",
        "doctor"
    ],

    "flesh_act3": [
        "guard",
        "nurse",
        "security officer",
        "sergeant",
        "vice-president"
    ],

    "flesh_act4": [
        "patient",
        "general",
        "president",
        "subject",
        "organism"
    ],

    "flesh_act5": [
        "bio-mass",
        "receptacle",
        "creature",
        "infection"
    ]
}


def get_job_title(_flesh_act, _index):
    return job_titles[_flesh_act][_index] if _flesh_act in job_titles else "passenger"


def get_nr_job_titles(_flesh_act):
    return len(job_titles[_flesh_act]) if _flesh_act in job_titles else 1


# Shuffle lists of first and last names.
# (These uses of random are fine because they're global for all users. It's just to avoid having any
#  predictable patterns.)
random.shuffle(first_names)
random.shuffle(last_names)
