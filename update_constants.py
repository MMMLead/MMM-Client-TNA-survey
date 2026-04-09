import re

file_path = '/src/constants.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Question 1 replacements
content = content.replace(
    'label: "Rate the overall proficiency of your VA in the following communication areas:"',
    'label: "How effectively does your Virtual Assistant communicate when performing the following tasks?"'
)
content = content.replace(
    'label: "Rate the overall proficiency of your VA in the following communication areas:*",',
    'label: "How effectively does your Virtual Assistant communicate when performing the following tasks?",'
)

old_desc1 = 'description: "Legend:\\nNA – Not applicable/not part of job\\n1 – Basic: Minimal knowledge; requires close guidance.\\n2 – Developing: Partial understanding; needs occasional support.\\n3 – Proficient: Performs tasks independently; meets expectations.\\n4 – Advanced: Demonstrates strong mastery; handles complex tasks independently.",'
new_desc1 = 'description: "Legend:\\nNA – Not applicable: Not part of your VA’s responsibilities\\n1 – Requires close guidance: Communication may need clarification or follow-up\\n2 – With occasional support: Communication is generally clear with some guidance\\n3 – Works independently: Communication is clear and appropriate in most situations\\n4 – Highly effective: Communication is clear, structured, and proactive",'
content = content.replace(old_desc1, new_desc1)

# Question 2 replacements
content = content.replace(
    'label: "For each task, indicate how essential it is for your VA to perform it correctly:"',
    'label: "For each task, how important is it for your Virtual Assistant to handle it effectively in your day-to-day operations?"'
)
content = content.replace(
    'label: "For each task, indicate how essential it is for your VA to perform it correctly:*",',
    'label: "For each task, how important is it for your Virtual Assistant to handle it effectively in your day-to-day operations?",'
)

old_desc2 = 'description: "Legend:\\nCritical – Cannot deploy without this skill\\nImportant – Deployment possible, but gaps must be addressed quickly\\nOptional – Can deploy even if skill is weak; can upskill later",'
new_desc2 = 'description: "Legend:\\nCore to the role – A key responsibility for your VA\\nImportant – Adds value to your workflow but can be developed over time\\nNice to have – Helpful, but not required for your VA’s role",'
content = content.replace(old_desc2, new_desc2)

content = content.replace(
    'columns: ["Critical", "Important", "Optional"],',
    'columns: ["Core to the role", "Important", "Nice to have"],'
)

# Question 3 replacements
content = content.replace(
    'label: "How important is clear verbal communication (including accent clarity) for your VAs to perform effectively in their role? (select one)*"',
    'label: "How important is clear verbal communication for your Virtual Assistant to perform effectively in their role?\\n(e.g., being easily understood during calls or voice interactions)"'
)

content = content.replace(
    '"Very important – VA must be easily understandable to clients and/or patients; thick accent could affect performance"',
    '"Core to the role – Clear and easily understood verbal communication is essential for client/patient interactions"'
)
content = content.replace(
    '"Important – Minor accent is acceptable as long as clients/patients understand"',
    '"Important – Clear communication is preferred; minor variations in speech are manageable"'
)
content = content.replace(
    '"Nice to have – Verbal communication skills is not critical for effective performance"',
    '"Nice to have – Verbal communication is not a primary requirement for this role"'
)

with open(file_path, 'w') as f:
    f.write(content)
