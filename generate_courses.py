import json

# Define the 22 categories
categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Design",
    "Graphic Design",
    "Business",
    "Marketing",
    "Finance",
    "Leadership",
    "Health",
    "Language",
    "Music",
    "Photography",
    "Writing",
    "Career",
    "Education",
    "Science",
    "Personal Development"
]

# Define instructors for each category
instructors = {
    "Web Development": ["Angela Yu", "Maximilian Schwarzmüller", "Stephen Grider", "Brad Traversy"],
    "Mobile Development": ["Angela Yu", "Tim Buchalka", "Maximilian Schwarzmüller", "Raymond Zhu"],
    "Data Science": ["IBM", "Roger Peng", "Frank Kane", "Kirill Eremenko"],
    "Artificial Intelligence": ["Andrew Ng", "DeepLearning.AI", "Google Cloud", "Microsoft"],
    "Cloud Computing": ["Google Cloud", "A Cloud Guru", "Microsoft", "AWS"],
    "Cybersecurity": ["Kevin Mitnick", "Chris Hadnagy", "Bruce Schneier", "SANS Institute"],
    "Blockchain": ["B2B Blockchain", "University of California", "Princeton University", "IBM"],
    "Design": ["Adobe", "Canva", "Figma", "Skillshare"],
    "Graphic Design": ["Martin Aranzabal", "Louise Cullen", "Dan Roam", "Sara Wood"],
    "Business": ["Reid Hoffman", "Michael Porter", "Warren Buffett", "Seth Godin"],
    "Marketing": ["Google", "Facebook", "HubSpot", "Neil Patel"],
    "Finance": ["JPMorgan Chase", "Goldman Sachs", "CFA Institute", "Khan Academy"],
    "Leadership": ["John Maxwell", "Simon Sinek", "Brené Brown", "Patrick Lencioni"],
    "Health": ["Dr. Andrew Weil", "Dr. Tony Jantz", "Dr. Michael Greger", "Dr. Andy Galpin"],
    "Language": ["Duolingo", "Babbel", "Rosetta Stone", "Busuu"],
    "Music": ["Berklee College of Music", "Splice", "Native Instruments", "Ableton"],
    "Photography": ["National Geographic", "Adobe", "PetaPixel", "SLR Lounge"],
    "Writing": ["Purdue University", "MasterClass", "Coursera", "edX"],
    "Career": ["LinkedIn Learning", "Indeed", "Glassdoor", "Carol Fishman"],
    "Education": ["Khan Academy", "Coursera", "edX", "FutureLearn"],
    "Science": ["MIT", "Stanford", "Caltech", "Harvard"],
    "Personal Development": ["Tony Robbins", "Tim Ferriss", "Laura Vanderkam", "Dale Carnegie"]
}

# Define platforms
platforms = ["Coursera", "Udemy", "edX", "LinkedIn Learning", "Udacity", "Skillshare", "Pluralsight", "FutureLearn"]

# Generate courses
courses = []
course_id = 101

for i, category in enumerate(categories):
    category_code = category[:2].upper()
    
    for j in range(4):
        course = {
            "courseId": f"{category_code}{course_id + j}",
            "title": f"{category} Course {j+1}",
            "description": f"Learn {category.lower()} with this comprehensive course designed for {'beginners' if j % 2 == 0 else 'intermediate learners'}. Gain practical skills and real-world experience.",
            "category": category,
            "instructor": instructors[category][j],
            "platform": platforms[j % len(platforms)],
            "duration": f"{8 + j*2} weeks (Self-paced)",
            "level": "Beginner" if j == 0 else "Intermediate" if j == 1 else "Advanced" if j == 2 else "Beginner to Intermediate",
            "price": "Free",
            "rating": round(4.2 + (j * 0.2), 1),
            "enrollmentCount": (10000 + j * 5000),
            "language": "English",
            "certification": f"Yes - {platforms[j % len(platforms)]} Certificate",
            "prerequisites": "Basic knowledge of the field" if j == 0 else "Intermediate knowledge" if j == 1 else "Advanced knowledge" if j == 2 else "Basic computer knowledge",
            "syllabus": [
                f"Module 1: {category} Fundamentals",
                f"Module 2: Core Concepts and Principles",
                f"Module 3: Advanced Techniques and Applications",
                f"Module 4: Real-world Projects and Case Studies",
                f"Module 5: Best Practices and Future Trends"
            ],
            "learningOutcomes": [
                f"Master the fundamentals of {category.lower()}",
                f"Apply advanced {category.lower()} techniques in real-world scenarios",
                f"Develop professional skills for career advancement"
            ],
            "tags": [category, f"{category} Skills", "Professional Development"],
            "image": f"/images/placeholders/{category.lower().replace(' ', '-')}.png"
        }
        courses.append(course)
    
    course_id += 100

# Save to JSON file
with open("complete_courses_full.json", "w") as f:
    json.dump(courses, f, indent=2)

print(f"Generated {len(courses)} courses across {len(categories)} categories")