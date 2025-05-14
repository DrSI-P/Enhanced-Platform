import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path="/home/ubuntu/edpsychconnect/.env")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not found. Please set it in the .env file.")

openai.api_key = OPENAI_API_KEY

async def generate_text(prompt: str, model: str = "gpt-4o", max_tokens: int = 2000, temperature: float = 0.7) -> str:
    """
    Generates text using the OpenAI API.

    Args:
        prompt: The prompt to send to the model.
        model: The OpenAI model to use (default: gpt-4o).
        max_tokens: The maximum number of tokens to generate.
        temperature: Controls randomness. Lower is more deterministic.

    Returns:
        The generated text as a string.
    """
    try:
        response = await openai.ChatCompletion.acreate(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant for an educational psychology platform aimed at the UK market. Your tone should be empathetic, authoritative, and accessible. All content must be evidence-based and practical, using UK English spelling and terminology. Focus on being positive and empowering, aligning with a \"restoring genius\" philosophy."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=max_tokens,
            temperature=temperature,
            # top_p=1.0, # Default
            # frequency_penalty=0.0, # Default
            # presence_penalty=0.0 # Default
        )
        if response.choices and len(response.choices) > 0:
            return response.choices[0].message.content.strip()
        else:
            return "Error: No response from OpenAI API or empty choices array."
    except openai.APIError as e:
        # Handle API error here, e.g. retry or log
        print(f"OpenAI API returned an API Error: {e}")
        return f"Error: OpenAI API Error - {e}"
    except openai.APIConnectionError as e:
        # Handle connection error here
        print(f"Failed to connect to OpenAI API: {e}")
        return f"Error: OpenAI Connection Error - {e}"
    except openai.RateLimitError as e:
        # Handle rate limit error (we recommend using exponential backoff)
        print(f"OpenAI API request exceeded rate limit: {e}")
        return f"Error: OpenAI Rate Limit Error - {e}"
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return f"Error: An unexpected error occurred - {e}"

# Example usage (for testing purposes - normally called from another module)
# async def main():
#     test_prompt = "Write a short introduction (approx 100 words) to the concept of Emotionally Based School Avoidance (EBSA) for UK parents."
#     generated_content = await generate_text(test_prompt)
#     print("--- Generated Content ---")
#     print(generated_content)
#     print("-------------------------")

# if __name__ == "__main__":
#     import asyncio
#     asyncio.run(main())


