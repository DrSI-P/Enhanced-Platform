import asyncio
from typing import List, Dict, Optional, Any

# Assuming services are in the same directory or accessible in PYTHONPATH
# For Next.js API routes, these would be structured imports within the /pages/api or a dedicated /lib or /services folder.
from .openai_service import generate_text, OPENAI_API_KEY # Import the key to check if it's loaded
from .topic_identifier_service import identify_trending_subtopics, CORE_THEMES # Using CORE_THEMES for example
from .prompt_template_service import create_blog_post_prompt, BLOG_SYSTEM_PROMPT

# Ensure API key is loaded before making calls
if not OPENAI_API_KEY:
    print("Warning: OpenAI API key not loaded. Blog generation will likely fail.")
    # In a real app, you might want to raise an error or handle this more gracefully

async def generate_blog_post_for_theme(theme_index: int, article_summaries_for_theme: List[str]) -> Optional[Dict[str, Any]]:
    """
    Orchestrates the generation of a blog post for a given core theme.
    1. Identifies trending subtopics for the theme (using provided summaries).
    2. Creates a detailed blog post prompt.
    3. Generates the blog post content using the LLM.

    Args:
        theme_index: Index of the core theme from CORE_THEMES.
        article_summaries_for_theme: A list of article summaries relevant to the theme (simulating search results).

    Returns:
        A dictionary containing the generated blog post and related info, or None if an error occurs.
    """
    if not (0 <= theme_index < len(CORE_THEMES)):
        print(f"Error: Invalid theme_index {theme_index}.")
        return None

    selected_theme = CORE_THEMES[theme_index]
    print(f"Starting blog post generation for theme: {selected_theme}")

    # 1. Identify trending subtopics
    # In a real scenario, article_summaries_for_theme would come from a web search based on the theme.
    print(f"Identifying trending subtopics based on {len(article_summaries_for_theme)} summaries...")
    trending_subtopics = await identify_trending_subtopics(article_summaries_for_theme, selected_theme, num_trends=3)
    if not trending_subtopics:
        print(f"Could not identify trending subtopics for {selected_theme}. Proceeding with theme only.")
        # Fallback: use the main theme as the primary angle if no subtopics identified
        key_angles_for_prompt = [selected_theme]
    else:
        print(f"Identified trends: {trending_subtopics}")
        key_angles_for_prompt = trending_subtopics

    # 2. Create the blog post prompt
    # For demonstration, we'll use some placeholder references. In a real system, these might be dynamic.
    placeholder_references = [
        "The importance of a relationship-based approach (Restorative Justice principles).",
        "Focus on understanding the child's perspective and unmet needs.",
        "Adherence to UK DfE guidelines and evidence-based practices."
    ]
    
    blog_prompt_text = create_blog_post_prompt(
        topic=selected_theme,
        key_angles=key_angles_for_prompt,
        target_audience="UK parents and educators",
        word_count=1200, # Target length
        references_to_include=placeholder_references,
        custom_instructions="Please ensure the conclusion offers at least 3 practical, actionable tips for the audience."
    )
    
    # print(f"\n--- Generated Blog Post Prompt for LLM ---\n{blog_prompt_text}\n---------------------------------------\n") # For debugging

    # 3. Generate the blog post content
    print(f"Generating blog post content for: {selected_theme}...")
    # Note: The BLOG_SYSTEM_PROMPT is already part of the generate_text function in openai_service.py
    # So we only need to pass the user-role prompt here.
    generated_content = await generate_text(blog_prompt_text, model="gpt-4o", max_tokens=2500, temperature=0.7)

    if generated_content.startswith("Error:"):
        print(f"Failed to generate blog post: {generated_content}")
        return None

    print(f"Successfully generated blog post for {selected_theme}.")
    return {
        "theme": selected_theme,
        "trending_subtopics_identified": trending_subtopics,
        "prompt_used": blog_prompt_text, # For review and refinement
        "generated_article_markdown": generated_content
    }

# Example of how to run this service (for testing)
# async def main():
#     print("Testing Blog Content Generation Service...")
#     # Simulate article summaries that would normally come from a web search
#     example_ebsa_summaries = [
#         "New DfE guidance on attendance highlights anxiety link to EBSA.",
#         "BPS report calls for multi-tiered support systems for EBSA students.",
#         "Research review: Family-school partnerships crucial in addressing EBSA.",
#         "The rise of EBSA post-pandemic: a challenge for UK schools.",
#         "Innovative school-based interventions for EBSA show promise in pilot studies."
#     ]

#     # Select a theme index (e.g., 0 for EBSA)
#     theme_to_generate_for = 0 

#     result = await generate_blog_post_for_theme(theme_to_generate_for, example_ebsa_summaries)

#     if result:
#         print(f"\n--- BLOG POST FOR: {result['theme']} ---")
#         # print(f"Identified Trends: {result['trending_subtopics_identified']}")
#         # print(f"\n--- PROMPT USED ---\n{result['prompt_used']}\n-------------------")
#         print(f"\n--- GENERATED ARTICLE (Markdown) ---
{result['generated_article_markdown']}
------------------------------------")
        
#         # Save the generated article to a file
#         output_filename = f"/home/ubuntu/generated_blog_post_{result['theme'].replace(' ', '_').replace('&', 'and')}.md"
#         with open(output_filename, "w", encoding="utf-8") as f:
#             f.write(f"# {result['theme']}\n\n")
#             f.write(result['generated_article_markdown'])
#         print(f"Blog post saved to {output_filename}")

# if __name__ == "__main__":
#     # This setup is needed to run asyncio top-level in a script
#     # In Next.js API routes, the framework handles the event loop.
#     # Ensure .env file is at /home/ubuntu/edpsychconnect/.env with OPENAI_API_KEY
#     asyncio.run(main())


