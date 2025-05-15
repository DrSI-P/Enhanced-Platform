#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
EdPsych Connect - Dynamic AI Learning Architect (DALA)
Curriculum and Content Module - Initial Prototype (Task 1.2.3)

This module will contain:
1.  A representation of a small, digitized curriculum slice.
2.  A small set of tagged learning content.
3.  Logic to store and retrieve this information.
"""

import json
import os # Added for path joining in main

# --- Digitized Curriculum Slice (with Prerequisites) ---

CURRICULUM_SLICE = {
    "subject": "Mathematics",
    "year_group": "Year 4",
    "topic": "Number - Multiplication and Division",
    "learning_objectives": [
        {
            "id": "Y4MD_LO1",
            "description": "Recall multiplication and division facts for multiplication tables up to 12 × 12.",
            "keywords": ["multiplication facts", "division facts", "times tables"],
            "prerequisites": [] # No prerequisites for this foundational LO
        },
        {
            "id": "Y4MD_LO2",
            "description": "Use place value, known and derived facts to multiply and divide mentally, including: multiplying by 0 and 1; dividing by 1; multiplying together three numbers.",
            "keywords": ["mental multiplication", "mental division", "place value", "derived facts"],
            "prerequisites": ["Y4MD_LO1"] # Requires recall of basic facts
        },
        {
            "id": "Y4MD_LO3",
            "description": "Recognise and use factor pairs and commutativity in mental calculations.",
            "keywords": ["factor pairs", "commutativity", "mental calculation"],
            "prerequisites": ["Y4MD_LO1"] # Requires recall of basic facts
        },
        {
            "id": "Y4MD_LO4",
            "description": "Solve problems involving multiplying and adding, including using the distributive law to multiply two digit numbers by one digit, integer scaling problems and harder correspondence problems such as n objects are connected to m objects.",
            "keywords": ["problem solving", "distributive law", "integer scaling", "correspondence problems"],
            "prerequisites": ["Y4MD_LO2", "Y4MD_LO3"] # Requires mental math skills and understanding of properties
        }
    ]
}

# --- Learning Content Set ---

LEARNING_CONTENT_SET = [
    {
        "content_id": "CONT_MD_001",
        "title": "Times Tables Practice Game (Up to 12x12)",
        "type": "game",
        "learning_objectives_covered": ["Y4MD_LO1"],
        "target_preferences": ["kinesthetic", "visual"],
        "difficulty": "medium",
        "url_path": "/content/games/timestables_y4.html" 
    },
    {
        "content_id": "CONT_MD_002",
        "title": "Video: Understanding Multiplication by 0 and 1",
        "type": "video",
        "learning_objectives_covered": ["Y4MD_LO2"],
        "target_preferences": ["visual", "auditory"],
        "difficulty": "easy",
        "url_path": "/content/videos/multiply_zero_one_y4.mp4"
    },
    {
        "content_id": "CONT_MD_003",
        "title": "Worksheet: Factor Pairs Fun",
        "type": "worksheet_pdf",
        "learning_objectives_covered": ["Y4MD_LO3"],
        "target_preferences": ["textual", "logical"],
        "difficulty": "medium",
        "url_path": "/content/worksheets/factor_pairs_y4.pdf"
    },
    {
        "content_id": "CONT_MD_004",
        "title": "Interactive: Mental Multiplication Challenge",
        "type": "interactive_quiz",
        "learning_objectives_covered": ["Y4MD_LO2"],
        "target_preferences": ["kinesthetic", "logical"],
        "difficulty": "medium",
        "url_path": "/content/interactive/mental_math_multiply_y4.html"
    },
    {
        "content_id": "CONT_MD_005",
        "title": "Explanation: The Distributive Law in Multiplication",
        "type": "text_explanation",
        "learning_objectives_covered": ["Y4MD_LO4"],
        "target_preferences": ["textual", "logical"],
        "difficulty": "hard",
        "url_path": "/content/text/distributive_law_y4.md"
    },
    {
        "content_id": "CONT_MD_006",
        "title": "Animated Story: Solving Scaling Problems",
        "type": "video", 
        "learning_objectives_covered": ["Y4MD_LO4"],
        "target_preferences": ["visual", "auditory", "narrative"],
        "difficulty": "hard",
        "url_path": "/content/videos/scaling_problems_story_y4.mp4"
    },
    {
        "content_id": "CONT_MD_007",
        "title": "Quick Quiz: Commutativity in Calculations",
        "type": "interactive_quiz",
        "learning_objectives_covered": ["Y4MD_LO3"],
        "target_preferences": ["logical"],
        "difficulty": "easy",
        "url_path": "/content/interactive/commutativity_quiz_y4.html"
    }
]

# --- Storage and Retrieval Logic (Simplified) ---

class CurriculumContentStore:
    """Manages the curriculum slice and learning content."""
    def __init__(self, curriculum_data, content_data):
        self.curriculum = curriculum_data
        self.content_library = {item["content_id"]: item for item in content_data}
        self.lo_to_content_map = self._build_lo_to_content_map(content_data)
        self.lo_details_map = {lo["id"]: lo for lo in curriculum_data.get("learning_objectives", [])}

    def _build_lo_to_content_map(self, content_data):
        """Helper to map learning objectives to content items."""
        mapping = {}
        for item in content_data:
            for lo_id in item["learning_objectives_covered"]:
                if lo_id not in mapping:
                    mapping[lo_id] = []
                mapping[lo_id].append(item["content_id"])
        return mapping

    def get_learning_objectives(self):
        """Returns all learning objectives in the slice."""
        return self.curriculum.get("learning_objectives", [])
    
    def get_lo_by_id(self, lo_id):
        """Retrieves details for a specific learning objective ID."""
        return self.lo_details_map.get(lo_id)

    def get_content_by_id(self, content_id):
        """Retrieves a content item by its ID."""
        return self.content_library.get(content_id)

    def get_content_for_lo(self, lo_id):
        """Retrieves all content items tagged for a specific learning objective ID."""
        content_ids = self.lo_to_content_map.get(lo_id, [])
        return [self.get_content_by_id(cid) for cid in content_ids if self.get_content_by_id(cid)]

    def save_to_json(self, curriculum_filepath="curriculum_slice.json", content_filepath="learning_content.json"):
        """Saves the curriculum and content data to JSON files."""
        try:
            with open(curriculum_filepath, "w", encoding="utf-8") as f_curr:
                json.dump(self.curriculum, f_curr, indent=4)
            print(f"Curriculum slice saved to {curriculum_filepath}")
            
            with open(content_filepath, "w", encoding="utf-8") as f_cont:
                json.dump(list(self.content_library.values()), f_cont, indent=4) 
            print(f"Learning content set saved to {content_filepath}")
        except IOError as e:
            print(f"Error saving data to JSON: {e}")

# --- Main execution for testing --- 
if __name__ == "__main__":
    print("--- Initializing DALA Curriculum & Content Module Prototype ---")
    
    store = CurriculumContentStore(curriculum_data=CURRICULUM_SLICE, content_data=LEARNING_CONTENT_SET)
    
    print("\n--- Testing Data Retrieval ---")
    all_los = store.get_learning_objectives()
    print(f"Total Learning Objectives: {len(all_los)}")
    if all_los:
        print(f"First LO: {all_los[0]['description']}")
        
        lo_to_test = all_los[0]['id']
        content_for_lo1 = store.get_content_for_lo(lo_to_test)
        print(f"\nContent items for LO 	{lo_to_test}	 (	{all_los[0]['description']}	):")
        for item in content_for_lo1:
            print(f"  - {item['title']} (Type: {item['type']}, Preferences: {item['target_preferences']})")

        # Test get_lo_by_id
        test_lo_id = "Y4MD_LO4"
        lo_detail = store.get_lo_by_id(test_lo_id)
        if lo_detail:
            print(f"\nDetails for LO {test_lo_id}: {lo_detail.get('description')}")
            print(f"Prerequisites for {test_lo_id}: {lo_detail.get('prerequisites')}")
        else:
            print(f"\nCould not find details for LO {test_lo_id}")

    prototype_dir = "/home/ubuntu/edpsychconnect_dala_prototype/data"
    os.makedirs(prototype_dir, exist_ok=True)
    store.save_to_json(
        curriculum_filepath=os.path.join(prototype_dir, "year4_maths_multi_div_curriculum.json"),
        content_filepath=os.path.join(prototype_dir, "year4_maths_multi_div_content.json")
    )

    print("\n--- Curriculum & Content Module Prototype Test Complete ---")


