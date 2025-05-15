"""
EdPsych Connect - Dynamic AI Learning Architect (DALA)
Holistic Learner Profiling (HLP) Module - Stage 2 Enhancements

This module contains the logic for:
1.  Interactive diagnostic mini-tasks for learning style/preference.
2.  Capturing student interests.
3.  Capturing student-reported struggle areas.
4.  Storing a basic learner profile.
5.  New sophisticated diagnostic mini-tasks (Stage 2).
6.  Tracking completed Learning Objectives (LOs) for prerequisite logic.
7.  Badge and achievement system (Stage 2).
"""

import random
import time
import sys
import inspect
import datetime # Added for timestamping earned badges

# --- Badge Definitions ---
# Defines all available badges, their properties, and how to check their criteria.
BADGE_DEFINITIONS = {
    "trailblazer": {
        "id": "trailblazer",
        "name": "Trailblazer",
        "description": "You've taken the first step on your learning adventure! (Completed HLP Introduction)",
        "image_url": "assets/badges/trailblazer_badge.png",
        "criteria_check_function": "check_trailblazer_badge"
    },
    "topic_tackler_numeria_novice": {
        "id": "topic_tackler_numeria_novice",
        "name": "Numeria Novice Tackler",
        "description": "Well done! You've successfully navigated the initial challenges of Numeria!",
        "image_url": "assets/badges/topic_tackler_badge.png", # Using generic Topic Tackler image
        "criteria_check_function": "check_topic_tackler_numeria_novice_badge"
    },
    "quest_completer_intro": {
        "id": "quest_completer_intro",
        "name": "Introductory Quest Completer",
        "description": "You've completed your first full quest! Adventure awaits!",
        "image_url": "assets/badges/quest_completer_badge.png",
        "criteria_check_function": "check_quest_completer_intro_badge"
    },
    "curiosity_spark": {
        "id": "curiosity_spark",
        "name": "Curiosity Spark",
        "description": "Your curiosity is shining bright! You've explored beyond the beaten path!",
        "image_url": "assets/badges/curiosity_spark_badge.png",
        "criteria_check_function": "check_curiosity_spark_badge"
    },
    "helping_hand": {
        "id": "helping_hand",
        "name": "Helping Hand",
        "description": "Well done for identifying areas to grow! Understanding your learning is a superpower!",
        "image_url": "assets/badges/helping_hand_badge.png",
        "criteria_check_function": "check_helping_hand_badge"
    }
}

class LearnerProfile:
    """Represents a basic learner profile."""
    def __init__(self, student_id):
        self.student_id = student_id
        self.learning_preferences = {} # Stores preferences like {"visual_task_1": "visual"}
        self.interests = []
        self.struggle_areas = []
        self.cognitive_metrics = {} # For new diagnostic tasks e.g. {"story_weaver": {"accuracy": 0.8}}
        self.completed_los = set()  # For tracking completed Learning Objectives
        self.current_learning_objective_id = None # Added for pathway tracking
        # Stores detailed data for earned badges, keyed by badge_id
        # Example: {"trailblazer": {"id": "trailblazer", "name": "Trailblazer", ..., "date_earned": "..."}}
        self.earned_badges_data = {} 

    def to_dict(self):
        """Returns a dictionary representation of the learner profile for serialization."""
        return {
            "student_id": self.student_id,
            "learning_preferences": self.learning_preferences,
            "interests": self.interests,
            "struggle_areas": self.struggle_areas,
            "cognitive_metrics": self.cognitive_metrics,
            "completed_los": list(self.completed_los),  # Convert set to list for JSON
            "current_learning_objective_id": self.current_learning_objective_id,
            "earned_badges_data": self.earned_badges_data
        }

    def update_preference(self, task_name, preference):
        """Updates a learning preference based on a diagnostic task."""
        self.learning_preferences[task_name] = preference
        print(f"Profile for {self.student_id}: Preference for {task_name} updated to {preference}")

    def add_interest(self, interest):
        """Adds an interest to the profile."""
        if interest not in self.interests:
            self.interests.append(interest)
            print(f"Profile for {self.student_id}: Interest '{interest}' added.")

    def add_struggle_area(self, area):
        """Adds a struggle area to the profile."""
        if area not in self.struggle_areas:
            self.struggle_areas.append(area)
            print(f"Profile for {self.student_id}: Struggle area '{area}' added.")

    def add_cognitive_metric(self, task_name, metric_name, value):
        """Adds a metric from a sophisticated diagnostic task or simple preference tasks."""
        if task_name not in self.cognitive_metrics:
            self.cognitive_metrics[task_name] = {}
        self.cognitive_metrics[task_name][metric_name] = value
        print(f"Profile for {self.student_id}: Cognitive metric for {task_name} - {metric_name} updated to {value}")

    def mark_lo_completed(self, lo_id):
        """Marks a Learning Objective as completed."""
        if lo_id not in self.completed_los:
            self.completed_los.add(lo_id)
            print(f"Profile for {self.student_id}: Learning Objective '{lo_id}' marked as completed.")
            # Potentially trigger badge check here
            check_and_award_all_relevant_badges(self) # Assuming curriculum_store might be needed later

    def has_completed_lo(self, lo_id):
        """Checks if a Learning Objective has been completed."""
        return lo_id in self.completed_los

    def add_badge(self, badge_id):
        """Adds a badge to the profile if not already earned, storing its details."""
        if badge_id not in self.earned_badges_data:
            badge_definition = BADGE_DEFINITIONS.get(badge_id)
            if not badge_definition:
                print(f"Error: Badge definition for '{badge_id}' not found.")
                return False
            
            earned_badge_info = badge_definition.copy() # Start with all definition info
            earned_badge_info["date_earned"] = datetime.datetime.utcnow().isoformat() + "Z"
            
            self.earned_badges_data[badge_id] = earned_badge_info
            print(f"Profile for {self.student_id}: Badge '{earned_badge_info['name']}' earned!")
            return True
        return False

    def has_badge(self, badge_id):
        """Checks if a specific badge has been earned."""
        return badge_id in self.earned_badges_data

    def __str__(self):
        earned_badges_summary = {bid: data.get('name', bid) for bid, data in self.earned_badges_data.items()}
        return (
            f"LearnerProfile(student_id='{self.student_id}', "
            f"preferences={self.learning_preferences}, "
            f"interests={self.interests}, "
            f"struggle_areas={self.struggle_areas}, "
            f"cognitive_metrics={self.cognitive_metrics}, "
            f"completed_los={self.completed_los}, "
            f"earned_badges_data={earned_badges_summary}"
            f")"
        )

# --- Badge Criteria Checking Functions ---
def check_trailblazer_badge(learner_profile, curriculum_store=None):
    """Criteria: Completed initial HLP tasks (simulated by having preferences and interests)."""
    return bool(learner_profile.learning_preferences.get("visual_preference_task_1") and 
                learner_profile.learning_preferences.get("textual_preference_task_1") and 
                learner_profile.interests)

def check_topic_tackler_numeria_novice_badge(learner_profile, curriculum_store=None):
    """Criteria: Completed first two math LOs (simulated)."""
    numeria_novice_los = ["MA4_N1a", "MA4_N1b"] # Example LO IDs
    return all(learner_profile.has_completed_lo(lo_id) for lo_id in numeria_novice_los)

def check_quest_completer_intro_badge(learner_profile, curriculum_store=None):
    """Criteria: Completed a certain number of LOs (e.g., 3 LOs for an intro quest)."""
    return len(learner_profile.completed_los) >= 3

def check_curiosity_spark_badge(learner_profile, curriculum_store=None):
    """Criteria: Student explored optional content (e.g., re-tried a task)."""
    return learner_profile.cognitive_metrics.get("story_weaver", {}).get("attempts", 0) > 1

def check_helping_hand_badge(learner_profile, curriculum_store=None):
    """Criteria: Student identified struggle areas."""
    return bool(learner_profile.struggle_areas)

# --- Badge Awarding Logic ---
def award_badge_if_criteria_met(learner_profile, badge_id, curriculum_store=None):
    """Awards a specific badge if criteria are met and it hasn't been earned yet."""
    if learner_profile.has_badge(badge_id):
        return None # Already earned

    badge_info = BADGE_DEFINITIONS.get(badge_id)
    if not badge_info:
        print(f"Warning: Badge ID '{badge_id}' not found in BADGE_DEFINITIONS.")
        return None

    criteria_met = False
    check_function_name = badge_info.get("criteria_check_function")
    
    if not check_function_name:
        print(f"Warning: No criteria_check_function defined for badge '{badge_id}'.")
        return None

    if hasattr(sys.modules[__name__], check_function_name):
        check_function = getattr(sys.modules[__name__], check_function_name)
        sig = inspect.signature(check_function)
        if "curriculum_store" in sig.parameters and curriculum_store is not None:
            criteria_met = check_function(learner_profile, curriculum_store=curriculum_store)
        else:
            criteria_met = check_function(learner_profile)
    else:
        print(f"Warning: Criteria check function '{check_function_name}' not found in module.")
        return None
            
    if criteria_met:
        if learner_profile.add_badge(badge_id):
            return badge_info # Return definition of newly awarded badge
    return None

def check_and_award_all_relevant_badges(learner_profile, curriculum_store=None):
    """Checks all defined badges and awards them if criteria are met."""
    print(f"\nChecking all relevant badges for {learner_profile.student_id}...")
    awarded_badges_in_this_check = []
    for badge_id in BADGE_DEFINITIONS.keys():
        awarded_badge_info = award_badge_if_criteria_met(learner_profile, badge_id, curriculum_store)
        if awarded_badge_info:
            awarded_badges_in_this_check.append(awarded_badge_info['name'])
    if awarded_badges_in_this_check:
        print(f"Newly awarded badges in this check: {', '.join(awarded_badges_in_this_check)}")
    else:
        print("No new badges awarded in this check.")
    return awarded_badges_in_this_check

# --- Diagnostic Mini-Tasks (Simplified Simulations) ---

def run_visual_preference_task(profile: LearnerProfile):
    task_id = "visual_preference_task_1"
    print(f"\nRunning Visual Preference Task for {profile.student_id}...")
    simulated_choice = random.choice(["visual", "textual/auditory"])
    preference_value = "visual" if simulated_choice == "visual" else "non-visual"
    profile.update_preference(task_id, preference_value)
    # Trigger badge check after HLP tasks
    check_and_award_all_relevant_badges(profile)
    return {"score": 10 if preference_value == "visual" else 5, "preference": preference_value}

def run_textual_preference_task(profile: LearnerProfile):
    task_id = "textual_preference_task_1"
    print(f"\nRunning Textual Preference Task for {profile.student_id}...")
    simulated_choice = random.choice(["detailed_text", "summary_bullets"])
    preference_value = "detailed_text" if simulated_choice == "detailed_text" else "concise_text"
    profile.update_preference(task_id, preference_value)
    # Trigger badge check after HLP tasks
    check_and_award_all_relevant_badges(profile)
    return {"score": 10 if preference_value == "detailed_text" else 5, "preference": preference_value}

def capture_student_interests(profile: LearnerProfile, num_interests_to_select=3):
    print(f"\nCapturing Interests for {profile.student_id}...")
    selected_interests = random.sample(PREDEFINED_INTERESTS, k=min(num_interests_to_select, len(PREDEFINED_INTERESTS)))
    for interest in selected_interests:
        profile.add_interest(interest)
    # Trigger badge check after HLP tasks
    check_and_award_all_relevant_badges(profile)
    return selected_interests

def capture_student_struggles(profile: LearnerProfile, num_struggles_to_select=2):
    print(f"\nCapturing Struggle Areas for {profile.student_id}...")
    selected_struggles = random.sample(PREDEFINED_STRUGGLE_AREAS, k=min(num_struggles_to_select, len(PREDEFINED_STRUGGLE_AREAS)))
    for area in selected_struggles:
        profile.add_struggle_area(area)
    # Trigger badge check for 'Helping Hand'
    check_and_award_all_relevant_badges(profile)
    return selected_struggles

PREDEFINED_INTERESTS = [
    "Space Exploration", "Dinosaurs", "Ancient Civilizations", 
    "Robotics", "Marine Biology", "Creative Writing", 
    "Music Composition", "Environmental Science", "Mythology"
]
PREDEFINED_STRUGGLE_AREAS = [
    "Understanding fractions", "Writing long essays", "Remembering historical dates",
    "Solving word problems in math", "Staying focused during lectures", "Public speaking",
    "Learning new vocabulary", "Organizing my study time"
]

def run_story_weaver_task(profile: LearnerProfile):
    task_name = "story_weaver"
    print(f"\nRunning '{task_name}' Task for {profile.student_id}...")
    num_panels = random.choice([3, 4, 5])
    simulated_accuracy = random.choice([0.6, 0.8, 1.0])
    simulated_attempts = random.randint(1, 3) if simulated_accuracy < 1.0 else 1
    profile.add_cognitive_metric(task_name, "num_panels", num_panels)
    profile.add_cognitive_metric(task_name, "accuracy", simulated_accuracy)
    profile.add_cognitive_metric(task_name, "attempts", simulated_attempts)
    # Trigger badge check, e.g., for 'Curiosity Spark'
    check_and_award_all_relevant_badges(profile)
    return {"task_name": task_name, "accuracy": simulated_accuracy, "attempts": simulated_attempts}

def run_mind_mapper_task(profile: LearnerProfile):
    task_name = "mind_mapper"
    print(f"\nRunning '{task_name}' Task for {profile.student_id}...")
    # ... (rest of the function as before, simplified for brevity) ...
    profile.add_cognitive_metric(task_name, "ideas_generated", random.randint(3,8))
    # Trigger badge check
    check_and_award_all_relevant_badges(profile)
    return {"task_name": task_name}

# --- Main HLP Process Simulation (Example Usage) ---
def run_full_hlp_assessment(student_id):
    """Simulates a full HLP assessment process for a student."""
    print(f"--- Starting Full HLP Assessment for Student: {student_id} ---")
    profile = LearnerProfile(student_id)

    # Initial HLP tasks (can trigger Trailblazer)
    run_visual_preference_task(profile)
    run_textual_preference_task(profile)
    capture_student_interests(profile)
    capture_student_struggles(profile) # Can trigger Helping Hand

    # Sophisticated diagnostic tasks (can trigger Curiosity Spark)
    run_story_weaver_task(profile)
    run_mind_mapper_task(profile)

    # Simulate completing some Learning Objectives (can trigger Topic Tackler, Quest Completer)
    # These LO IDs should align with curriculum_content_module.py if using real curriculum data
    profile.mark_lo_completed("MA4_N1a")
    profile.mark_lo_completed("MA4_N1b") # Triggers Numeria Novice Tackler
    profile.mark_lo_completed("EN4_C1a") # Triggers Intro Quest Completer (if 3 LOs is the threshold)

    print(f"\n--- HLP Assessment Complete for Student: {student_id} ---")
    print("Final Learner Profile:")
    print(profile)
    
    print("\nFinal check for any missed badges (should be redundant if called within tasks):")
    check_and_award_all_relevant_badges(profile)
    
    return profile

if __name__ == '__main__':
    # Example of how to run the HLP assessment and see badge awarding in action
    test_student_profile = run_full_hlp_assessment("student_007")

    print("\n--- Earned Badges Summary ---")
    if test_student_profile.earned_badges_data:
        for badge_id, data in test_student_profile.earned_badges_data.items():
            print(f"- {data['name']}: {data['description']} (Earned on: {data['date_earned']})")
    else:
        print("No badges earned yet.")

    # Example of checking a specific badge
    # award_badge_if_criteria_met(test_student_profile, "trailblazer")
    # print(test_student_profile.earned_badges_data.get("trailblazer"))

