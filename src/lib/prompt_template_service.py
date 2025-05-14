from typing import List, Optional, Dict

# Base system prompt to guide the LLM's overall behaviour for blog content
# This is similar to the one in openai_service.py but can be more specific to blog generation here.
BLOG_SYSTEM_PROMPT = (
    "You are an expert writer for EdPsych Connect, an educational psychology platform targeting the UK market. "
    "Your primary audience includes UK parents, educators, and older students. "
    "Your writing style must be empathetic, authoritative, yet accessible and easy to understand. "
    "All content must be strictly evidence-based, drawing from reputable research and best practices in educational psychology. "
    "Provide practical, actionable advice and insights. "
    "Ensure all terminology, spellings (UK English), and references are specific to the UK educational system (e.g., DfE guidelines, UK curriculum). "
    "Maintain a positive and empowering tone, aligning with a \"restoring genius\" philosophy. "
    "Cite sources or refer to types of evidence where appropriate (e.g., \"Research suggests...\", \"According to DfE guidelines...\")."
)

def create_blog_post_prompt(
    topic: str,
    key_angles: Optional[List[str]] = None,
    target_audience: str = "UK parents and educators",
    word_count: int = 1200,
    references_to_include: Optional[List[str]] = None,
    custom_instructions: Optional[str] = None
) -> str:
    """
    Generates a detailed prompt for creating a full blog post.

    Args:
        topic: The main topic of the blog post.
        key_angles: Specific aspects or sub-topics to focus on.
        target_audience: The primary audience for the post.
        word_count: Approximate desired word count (e.g., 800-1500 words).
        references_to_include: Specific principles from Dr. Patrick's work or key research points to weave in.
        custom_instructions: Any other specific instructions for this particular blog post.

    Returns:
        A string containing the detailed prompt for the LLM.
    """
    prompt_lines = [
        f"Please write a comprehensive blog post of approximately {word_count} words on the following topic: ",
        f"**Topic:** {topic}",
        f"**Target Audience:** {target_audience}",
        "\n**Key Focus & Structure:**"
    ]

    if key_angles:
        prompt_lines.append("The post should explore the following key angles or sub-topics:")
        for i, angle in enumerate(key_angles):
            prompt_lines.append(f"  {i+1}. {angle}")
    else:
        prompt_lines.append("Please structure the post logically with an introduction, several main body sections exploring different facets of the topic, and a concluding summary with actionable takeaways.")
    
    prompt_lines.append("\n**Content Requirements:**")
    prompt_lines.append("- The content must be deeply rooted in evidence-based practices relevant to UK educational psychology.")
    prompt_lines.append("- Provide practical examples, strategies, or advice that the target audience can apply.")
    prompt_lines.append("- Ensure a compassionate and understanding tone throughout.")
    prompt_lines.append("- All information, terminology, and spellings must be UK-specific.")

    if references_to_include:
        prompt_lines.append("\n**Specific Inclusions:**")
        prompt_lines.append("Please subtly weave in or reference the following concepts or principles where relevant:")
        for ref in references_to_include:
            prompt_lines.append(f"  - {ref}")

    prompt_lines.append("\n**Output Format:**")
    prompt_lines.append("- The blog post should be well-structured with clear headings and subheadings (using Markdown for formatting if possible, e.g., ## Heading, ### Subheading). ")
    prompt_lines.append("- Start with an engaging introduction that clearly states the post's purpose and relevance to the audience.")
    prompt_lines.append("- Conclude with a summary of key points and empowering, actionable advice or resources for further help.")
    prompt_lines.append("- Maintain a word count of approximately {word_count} words.")

    if custom_instructions:
        prompt_lines.append(f"\n**Additional Instructions:**")
        prompt_lines.append(custom_instructions)
    
    prompt_lines.append("\nRemember to adhere to the overall style guide: empathetic, authoritative, accessible, evidence-based, practical, UK-centric, positive, and empowering.")

    return "\n".join(prompt_lines)

# Example usage (for testing purposes)
# def main_prompt_template_test():
#     topic = "Understanding and Supporting Children with Emotionally Based School Avoidance (EBSA)"
#     angles = [
#         "Defining EBSA and differentiating it from truancy.",
#         "Common underlying causes and triggers of EBSA (e.g., anxiety, sensory issues, bullying, academic pressures).",
#         "The role of parents and caregivers in identifying and supporting a child with EBSA.",
#         "Collaborative strategies between home and school to create a supportive return-to-school plan.",
#         "Evidence-based interventions and resources available in the UK."
#     ]
#     references = [
#         "The importance of a relationship-based approach (Restorative Justice principles).",
#         "Focus on understanding the child's perspective and unmet needs."
#     ]
#     custom_instr = "Ensure a section on where parents can seek further professional help in the UK."

#     blog_prompt = create_blog_post_prompt(
#         topic=topic, 
#         key_angles=angles, 
#         word_count=1500,
#         references_to_include=references,
#         custom_instructions=custom_instr
#     )
#     print("--- Generated Blog Post Prompt ---")
#     print(blog_prompt)
#     print("----------------------------------")

# if __name__ == "__main__":
#     main_prompt_template_test()

