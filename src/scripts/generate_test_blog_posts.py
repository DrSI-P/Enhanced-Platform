import asyncio
import os
import sys

# Add the project root to the Python path to allow imports from src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
print(f"Current sys.path before src.lib imports: {sys.path}")
print(f"Current working directory: {os.getcwd()}")
# Ensure src/lib also has an __init__.py if it contains modules to be imported
# For example, if blog_content_service is in src/lib, then src/lib/__init__.py should exist.

from src.lib.blog_content_service import generate_blog_post_content
from src.lib.topic_identifier_service import identify_trending_topics # For potential future use or if needed for specific angles

async def generate_test_posts():
    drafts_dir = "/home/ubuntu/edpsychconnect/content/blog/drafts"
    os.makedirs(drafts_dir, exist_ok=True)

    test_topics = [
        {
            "main_topic": "Emotionally Based School Avoidance (EBSA)",
            "angle": "Practical strategies for parents and educators in the UK to support children experiencing EBSA.",
            "filename": "ebsa-support-strategies-uk.md"
        },
        {
            "main_topic": "Restorative Justice in Schools",
            "angle": "Exploring the benefits and implementation of restorative justice practices in UK primary and secondary schools.",
            "filename": "restorative-justice-uk-schools.md"
        },
        {
            "main_topic": "Navigating the EHCNA Process",
            "angle": "A step-by-step guide for UK parents on understanding and navigating the Education, Health and Care Needs Assessment.",
            "filename": "ehcna-guide-for-parents-uk.md"
        }
    ]

    for topic_info in test_topics:
        print(f"Generating blog post for: {topic_info['main_topic']} - {topic_info['angle']}")
        try:
            # In a real scenario, trending topics/angles might be dynamically identified
            # For this test, we are using predefined angles.
            blog_post_content = await generate_blog_post_content(
                topic_info["main_topic"],
                specific_angle=topic_info["angle"],
                target_audience="UK parents and educators",
                # Assuming dr_patrick_work_snippets can be None or fetched if available
                dr_patrick_work_snippets=None 
            )
            
            if blog_post_content:
                filepath = os.path.join(drafts_dir, topic_info["filename"])
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(blog_post_content)
                print(f"Successfully generated and saved: {filepath}")
            else:
                print(f"Failed to generate content for: {topic_info['main_topic']}")
        except Exception as e:
            print(f"Error generating blog post for {topic_info['main_topic']}: {e}")

if __name__ == "__main__":
    asyncio.run(generate_test_posts())

