#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
EdPsych Connect - Dynamic AI Learning Architect (DALA)
Dynamic Curriculum Weaving & Adaptive Pathway Generation (DCW-APG) Module - Stage 2 Enhancements

This module contains the logic for:
1.  Generating a learning pathway considering LO prerequisites.
2.  Selecting content for these LOs based on learner profile preferences, difficulty progression,
    and offering a variety of activities.
"""

import random
from hlp_module import LearnerProfile
from curriculum_content_module import CurriculumContentStore, CURRICULUM_SLICE, LEARNING_CONTENT_SET

# Difficulty mapping for sorting content
DIFFICULTY_ORDER = {"easy": 1, "medium": 2, "hard": 3, "default": 99}

class PathwayGenerator:
    """Generates a learning pathway for a student, considering prerequisites, difficulty, and activity variety."""
    def __init__(self, learner_profile: LearnerProfile, content_store: CurriculumContentStore):
        self.learner_profile = learner_profile
        self.content_store = content_store

    def _is_lo_eligible(self, lo_id: str) -> bool:
        """Checks if a Learning Objective is eligible based on completed prerequisites."""
        lo_details = self.content_store.get_lo_by_id(lo_id)
        
        if not lo_details:
            print(f"Warning: LO details not found for ID: {lo_id}. Assuming not eligible.")
            return False
            
        prerequisites = lo_details.get("prerequisites", [])
        if not prerequisites:
            return True
        
        for prereq_id in prerequisites:
            if not self.learner_profile.has_completed_lo(prereq_id):
                return False
        return True

    def _select_varied_content_for_lo(self, lo_id: str, available_content_for_lo: list, max_activities_per_lo=2) -> list:
        """Selects a variety of appropriate content items for an LO."""
        if not available_content_for_lo:
            return []

        sorted_content_all = sorted(
            available_content_for_lo,
            key=lambda c: DIFFICULTY_ORDER.get(c.get("difficulty", "default").lower(), DIFFICULTY_ORDER["default"])
        )

        selected_activities = []
        used_content_ids = set()

        # Determine preferred content types based on learner profile
        preferred_types_ordered_list = []
        if self.learner_profile.learning_preferences.get("visual_task_1") == "visual":
            preferred_types_ordered_list.extend(["video", "interactive_quiz", "game"])
        if self.learner_profile.learning_preferences.get("textual_task_1") == "detailed_text":
            preferred_types_ordered_list.extend(["text_explanation", "worksheet_pdf"])
        # Add other types to ensure all are considered, with less preference
        all_possible_types = ["video", "interactive_quiz", "game", "text_explanation", "worksheet_pdf"]
        for pt in all_possible_types:
            if pt not in preferred_types_ordered_list:
                preferred_types_ordered_list.append(pt)
        
        # 1. Preference-Driven Selection (Primary Choice)
        for pref_type in preferred_types_ordered_list:
            if len(selected_activities) >= max_activities_per_lo:
                break
            for item in sorted_content_all:
                if item["type"] == pref_type and item["content_id"] not in used_content_ids:
                    selected_activities.append(item)
                    used_content_ids.add(item["content_id"])
                    break # Found one of this preferred type, move to next preferred type or variety selection
            if len(selected_activities) > 0 and selected_activities[-1]["type"] == pref_type: # if we just added one of this type
                continue # try to get a *different* preferred type next if possible
        
        # 2. Variety-Driven Selection (Fill remaining slots if any)
        # Ensure we try to get different types if possible
        current_selected_types = {act["type"] for act in selected_activities}
        general_type_priority_for_variety = ["game", "interactive_quiz", "video", "worksheet_pdf", "text_explanation"]

        if len(selected_activities) < max_activities_per_lo:
            for activity_type in general_type_priority_for_variety:
                if len(selected_activities) >= max_activities_per_lo:
                    break
                if activity_type not in current_selected_types: # Only add if it's a new type
                    for item in sorted_content_all:
                        if item["type"] == activity_type and item["content_id"] not in used_content_ids:
                            selected_activities.append(item)
                            used_content_ids.add(item["content_id"])
                            current_selected_types.add(activity_type)
                            break # Found one of this type for variety

        # 3. Fallback: If still not enough activities, fill with any easiest available unique content
        if len(selected_activities) < max_activities_per_lo:
            for item in sorted_content_all:
                if len(selected_activities) >= max_activities_per_lo:
                    break
                if item["content_id"] not in used_content_ids:
                    selected_activities.append(item)
                    used_content_ids.add(item["content_id"])
                    # No need to update current_selected_types here as we are just filling up

        # If nothing selected despite content (should be rare with fallbacks), pick the absolute easiest one.
        if not selected_activities and sorted_content_all:
            selected_activities.append(sorted_content_all[0])

        return selected_activities[:max_activities_per_lo]

    def generate_pathway_with_prerequisites(self, max_los=3, max_activities_per_lo=2):
        """
        Generates a learning pathway by selecting eligible LOs based on prerequisites
        and then selecting a variety of content for these LOs, considering difficulty.
        Returns a list of tuples: (lo_data_dict, list_of_content_item_dicts)
        """
        print(f"\n--- Generating Pathway (Prerequisites, Difficulty, Variety) for {self.learner_profile.student_id} ---")
        all_learning_objectives = self.content_store.get_learning_objectives()
        generated_pathway_tuples = [] # Stores (lo_dict, content_list) tuples

        if not all_learning_objectives:
            print("No learning objectives found in the curriculum store.")
            return generated_pathway_tuples

        candidate_los = [lo for lo in all_learning_objectives if not self.learner_profile.has_completed_lo(lo['id'])]
        
        potential_next_los = []
        for lo_data in candidate_los:
            if self._is_lo_eligible(lo_data['id']):
                potential_next_los.append(lo_data)
        
        random.shuffle(potential_next_los)
        selected_los_for_this_pathway = potential_next_los[:min(len(potential_next_los), max_los)]

        for lo_data in selected_los_for_this_pathway:
            print(f"Processing LO: {lo_data['id']} - {lo_data['description']}")
            available_content = self.content_store.get_content_for_lo(lo_data['id'])
            
            selected_activity_list = self._select_varied_content_for_lo(lo_data['id'], available_content, max_activities_per_lo)
            
            if selected_activity_list:
                print(f"  Selected activities for LO {lo_data['id']}:")
                for act_item in selected_activity_list:
                    print(f"    - {act_item['title']} (Type: {act_item['type']}, Difficulty: {act_item['difficulty']})")
                generated_pathway_tuples.append((lo_data, selected_activity_list))
            else:
                print(f"  No suitable content found for LO: {lo_data['id']}")
                generated_pathway_tuples.append((lo_data, []))
        
        if not generated_pathway_tuples:
            print("No eligible Learning Objectives could be added to the pathway at this time.")
        print("--- Pathway Generation Complete ---")
        return generated_pathway_tuples

    def generate_initial_pathway(self, target_lo_count=3, max_activities_per_lo=2):
        """
        Generates an initial learning pathway, typically for when a student starts or needs a new set of LOs.
        This is essentially a wrapper for generate_pathway_with_prerequisites with specific defaults.
        Returns a list of LearningObjective-like objects (dictionaries) with their content items for the interface.
        """
        print(f"\n--- Generating Initial Pathway (target_lo_count={target_lo_count}) for {self.learner_profile.student_id} ---")
        pathway_tuples = self.generate_pathway_with_prerequisites(max_los=target_lo_count, max_activities_per_lo=max_activities_per_lo)
        
        # Transform the (lo_dict, content_list) tuples into the structure expected by the interface
        # (list of LO-like dicts, where each LO-like dict has a 'content_items' key)
        interface_pathway = []
        for lo_data, content_list in pathway_tuples:
            # Create a new dictionary to avoid modifying the original lo_data if it's shared
            lo_for_interface = lo_data.copy()
            lo_for_interface['content_items'] = content_list
            interface_pathway.append(lo_for_interface)
            
        return interface_pathway

    def display_pathway(self, pathway_to_display, student_id):
        print(f"\n--- Learning Pathway for {student_id} ---")
        if not pathway_to_display:
            print("No pathway generated or pathway is empty.")
            return
        
        # Check if pathway_to_display is a list of (lo, content_items_list) tuples or list of LO-like dicts
        if pathway_to_display and isinstance(pathway_to_display[0], tuple):
            # Original tuple format
            for i, (lo, content_items_list) in enumerate(pathway_to_display):
                print(f"Step {i+1}: Learning Objective: {lo['description']} (ID: {lo['id']})")
                if content_items_list:
                    for idx, content_item in enumerate(content_items_list):
                        print(f"  Activity {idx+1}: {content_item['title']} (Type: {content_item['type']}, Difficulty: {content_item['difficulty']}, Access at: {content_item['url_path']})")
                else:
                    print("  Activity: No suitable content found for this objective based on current criteria.")
        else:
            # New format (list of LO-like dicts with 'content_items')
            for i, lo_with_content in enumerate(pathway_to_display):
                print(f"Step {i+1}: Learning Objective: {lo_with_content['description']} (ID: {lo_with_content['id']})")
                content_items_list = lo_with_content.get('content_items', [])
                if content_items_list:
                    for idx, content_item in enumerate(content_items_list):
                        print(f"  Activity {idx+1}: {content_item['title']} (Type: {content_item['type']}, Difficulty: {content_item['difficulty']}, Access at: {content_item['url_path']})")
                else:
                    print("  Activity: No suitable content found for this objective based on current criteria.")
        print("--------------------------------------")

if __name__ == "__main__":
    print("--- Initializing DALA DCW-APG Module Prototype (with Varied Activities) ---")
    
    content_store_instance = CurriculumContentStore(curriculum_data=CURRICULUM_SLICE, content_data=LEARNING_CONTENT_SET)
    print("\nCurriculum and Content Store Initialized.")

    # Test Case 1: Student with visual preference, expect varied visual types or easiest if not enough visual.
    student1_profile = LearnerProfile(student_id="student_variety_001")
    student1_profile.update_preference("visual_task_1", "visual")
    print("\nSimulated Learner Profile (Student 1 - Visual Preference):")
    print(student1_profile)
    pathway_gen1 = PathwayGenerator(learner_profile=student1_profile, content_store=content_store_instance)
    # Test generate_initial_pathway
    generated_pathway1 = pathway_gen1.generate_initial_pathway(target_lo_count=2, max_activities_per_lo=2)
    pathway_gen1.display_pathway(generated_pathway1, student1_profile.student_id)

    # Test Case 2: Student with textual preference, Y4MD_LO1 completed.
    student2_profile = LearnerProfile(student_id="student_variety_002")
    student2_profile.update_preference("textual_task_1", "detailed_text")
    student2_profile.mark_lo_completed("Y4MD_LO1")
    print("\nSimulated Learner Profile (Student 2 - Textual Preference, Y4MD_LO1 completed):")
    print(student2_profile)
    pathway_gen2 = PathwayGenerator(learner_profile=student2_profile, content_store=content_store_instance)
    generated_pathway2 = pathway_gen2.generate_initial_pathway(target_lo_count=2, max_activities_per_lo=2)
    pathway_gen2.display_pathway(generated_pathway2, student2_profile.student_id)

    # Test Case 3: Student with no specific preference, Y4MD_LO1 completed.
    student3_profile = LearnerProfile(student_id="student_variety_003")
    student3_profile.mark_lo_completed("Y4MD_LO1")
    print("\nSimulated Learner Profile (Student 3 - No Preference, Y4MD_LO1 completed):")
    print(student3_profile)
    pathway_gen3 = PathwayGenerator(learner_profile=student3_profile, content_store=content_store_instance)
    generated_pathway3 = pathway_gen3.generate_initial_pathway(target_lo_count=2, max_activities_per_lo=3) # Ask for up to 3
    pathway_gen3.display_pathway(generated_pathway3, student3_profile.student_id)
    
    # Test Case 4: Y4MD_LO4 eligibility
    student4_profile = LearnerProfile(student_id="student_variety_004")
    student4_profile.mark_lo_completed("Y4MD_LO1")
    student4_profile.mark_lo_completed("Y4MD_LO2")
    student4_profile.mark_lo_completed("Y4MD_LO3") # Y4MD_LO4 should be eligible
    print("\nSimulated Learner Profile (Student 4 - Y4MD_LO1,2,3 completed for Y4MD_LO4):")
    print(student4_profile)
    pathway_gen4 = PathwayGenerator(learner_profile=student4_profile, content_store=content_store_instance)
    generated_pathway4 = pathway_gen4.generate_initial_pathway(target_lo_count=1, max_activities_per_lo=3) # Focus on Y4MD_LO4
    pathway_gen4.display_pathway(generated_pathway4, student4_profile.student_id)


    print("\n--- DCW-APG Module Varied Activities Test Complete ---")

