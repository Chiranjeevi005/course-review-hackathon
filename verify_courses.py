import json

# Load the courses data
with open('complete_courses_full.json', 'r') as f:
    data = json.load(f)

# Count courses per category
categories = {}
for course in data:
    category = course['category']
    categories[category] = categories.get(category, 0) + 1

# Print results
print('Categories and course counts:')
for cat, count in sorted(categories.items()):
    print(f'{cat}: {count}')

print(f'\nTotal courses: {len(data)}')
print(f'Total categories: {len(categories)}')

# Verify each category has exactly 4 courses
all_correct = True
for cat, count in categories.items():
    if count != 4:
        print(f'ERROR: {cat} has {count} courses instead of 4')
        all_correct = False

if all_correct:
    print('\n✓ All categories have exactly 4 courses')
else:
    print('\n✗ Some categories do not have exactly 4 courses')