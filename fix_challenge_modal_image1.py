import os

challenge_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\challenge.html"

new_content = """<div class="modal-dialog modal-xl" role="document" x-data="Challenge" x-init='id = {{ challenge.id }}; max_attempts = {{ max_attempts }}; attempts = {{ attempts }}; ratingValue = {{ (rating.get("value") if rating else None) | tojson }}; ratingReview = {{ (rating.get("review", "") if rating else None) | tojson }};'>
  <div class="modal-content" style="border: none; border-radius: 12px; background-color: #ffffff; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
    
    {% set cat_lower = challenge.category | lower if challenge.category else '' %}
    {% set cat_icon = 'fa-puzzle-piece' %}
    {% if 'web' in cat_lower %}
        {% set cat_icon = 'fa-laptop-code' %}
    {% elif 'osint' in cat_lower %}
        {% set cat_icon = 'fa-globe' %}
    {% elif 'crypto' in cat_lower %}
        {% set cat_icon = 'fa-lock' %}
    {% elif 'reverse' in cat_lower or 'pwn' in cat_lower %}
        {% set cat_icon = 'fa-microchip' %}
    {% elif 'sanity' in cat_lower %}
        {% set cat_icon = 'fa-cube' %}
    {% endif %}

    {% set diff_text = challenge.difficulty if challenge.difficulty else 'Medium' %}
    {% set t_val = diff_text | lower %}
    {% set diff_bars = 2 %}
    {% if t_val == 'easy' %}
        {% set diff_bars = 1 %}
    {% elif t_val == 'hard' %}
        {% set diff_bars = 3 %}
    {% endif %}

    <div class="modal-body p-4 p-md-5 position-relative" style="background-image: radial-gradient(circle at 10px 10px, #e2e8f0 1px, transparent 1px); background-size: 20px 20px;">
      
      <!-- Top Bar -->
      <div class="d-flex justify-content-between align-items-center mb-5">
        <button class="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2 p-0" data-bs-dismiss="modal" style="font-weight: 600; font-size: 0.95rem;">
          <i class="fas fa-arrow-left"></i> 
          <span>Back to Challenges</span>
        </button>
        
        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center gap-3">
             <span style="color: #ff3333; border: 1px solid rgba(255,51,51,0.3); background: transparent; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">{{ diff_text | upper }}</span>
             <div class="d-flex gap-1 align-items-center">
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 1 %}background: #ff3333;{% else %}border: 1px solid #ff3333; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 2 %}background: #ff3333;{% else %}border: 1px solid #ff3333; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 3 %}background: #ff3333;{% else %}border: 1px solid #ff3333; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; border: 1px solid #ff3333; background: transparent;"></div>
             </div>
          </div>
          
          <div class="d-flex flex-column align-items-center" style="line-height: 1;">
            <span style="color: #0066ff; font-weight: 800; font-size: 1.5rem;">{{ challenge.value }}</span>
            <span style="color: #94a3b8; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.5px;">POINTS</span>
          </div>
          
          <button class="btn p-0 border-0 ms-3" data-bs-dismiss="modal" aria-label="Close" style="background: transparent; color: #111;">
            <i class="fas fa-times fs-4"></i>
          </button>
        </div>
      </div>

      <div class="row g-4 m-0">
        <!-- LEFT COLUMN -->
        <div class="col-lg-7 p-0 pe-lg-3">
          
          <!-- Header (Icon, Title) -->
          <div class="d-flex flex-column flex-sm-row gap-4 align-items-center align-items-sm-start mb-4">
            <div class="flex-shrink-0 d-flex align-items-center justify-content-center position-relative" style="width: 120px; height: 120px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.05);">
              <!-- Target corners -->
              <div style="position: absolute; top: 12px; left: 12px; width: 10px; height: 10px; border-top: 2px solid #0066ff; border-left: 2px solid #0066ff;"></div>
              <div style="position: absolute; top: 12px; right: 12px; width: 10px; height: 10px; border-top: 2px solid #0066ff; border-right: 2px solid #0066ff;"></div>
              <div style="position: absolute; bottom: 12px; left: 12px; width: 10px; height: 10px; border-bottom: 2px solid #0066ff; border-left: 2px solid #0066ff;"></div>
              <div style="position: absolute; bottom: 12px; right: 12px; width: 10px; height: 10px; border-bottom: 2px solid #0066ff; border-right: 2px solid #0066ff;"></div>
              
              <div style="width: 70px; height: 70px; background: radial-gradient(circle, #eef2ff 0%, transparent 70%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas {{ cat_icon }}" style="font-size: 2.5rem; color: #0066ff;"></i>
              </div>
            </div>
            
            <div class="mt-2 text-center text-sm-start">
              <div class="d-inline-flex align-items-center gap-2 mb-2 px-3 py-1" style="background: #eef2ff; color: #0066ff; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">
                <i class="fas fa-globe"></i> {{ challenge.category | upper }}
              </div>
              <h1 class="m-0 text-dark mb-2" style="font-weight: 700; font-size: 2.2rem; letter-spacing: 0.5px;">{{ challenge.name }}</h1>
              <div class="d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                <div style="width: 60px; height: 3px; background: #0066ff; border-radius: 2px;"></div>
                <div style="display: flex; gap: 4px;">
                  <div style="width: 4px; height: 4px; background: #cbd5e1; border-radius: 50%;"></div>
                  <div style="width: 4px; height: 4px; background: #cbd5e1; border-radius: 50%;"></div>
                  <div style="width: 4px; height: 4px; background: #cbd5e1; border-radius: 50%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Description Box -->
          <div class="p-4 position-relative" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <!-- Custom blue left border -->
            <div style="position: absolute; left: 0; top: 15%; bottom: 15%; width: 4px; background: #0066ff; border-radius: 0 4px 4px 0;"></div>
            
            <h5 class="mb-4 d-flex align-items-center gap-2" style="color: #0066ff; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">
              <i class="fas fa-file-alt"></i> DESCRIPTION
            </h5>
            
            <div class="text-dark" style="font-size: 0.95rem; line-height: 1.6; font-weight: 400;">
              {{ challenge.html | safe }}
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-lg-5 p-0 ps-lg-3">
          <div class="p-4 h-100" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <h5 class="mb-4 d-flex align-items-center gap-2" style="color: #0066ff; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">
              <i class="fas fa-info-circle"></i> CHALLENGE INFO
            </h5>
            
            <ul class="list-unstyled m-0">
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3" style="font-weight: 500; font-size: 0.85rem; color: #475569;">
                  <i class="fas fa-globe" style="color: #94a3b8; font-size: 1rem; width: 16px; text-align: center;"></i> Category
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.category }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3" style="font-weight: 500; font-size: 0.85rem; color: #475569;">
                  <i class="fas fa-signal" style="color: #94a3b8; font-size: 1rem; width: 16px; text-align: center;"></i> Difficulty
                </span>
                <span style="color: #ff3333; font-weight: 600; font-size: 0.9rem;">{{ diff_text }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3" style="font-weight: 500; font-size: 0.85rem; color: #475569;">
                  <i class="fas fa-trophy" style="color: #94a3b8; font-size: 1rem; width: 16px; text-align: center;"></i> Points
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.value }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3" style="font-weight: 500; font-size: 0.85rem; color: #475569;">
                  <i class="fas fa-user" style="color: #94a3b8; font-size: 1rem; width: 16px; text-align: center;"></i> Solves
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ solves if solves != None else 0 }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center {% if not challenge.hint %}mb-0 pb-0 border-0{% else %}mb-4 pb-4{% endif %}" {% if challenge.hint %}style="border-bottom: 1px solid #f1f5f9;"{% endif %}>
                <span class="d-flex align-items-center gap-3" style="font-weight: 500; font-size: 0.85rem; color: #475569;">
                  <i class="fas fa-pencil-alt" style="color: #94a3b8; font-size: 1rem; width: 16px; text-align: center;"></i> Author
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.author if challenge.author else "Aeries" }}</span>
              </li>
              
              {% if challenge.hint %}
              <li x-data="{ hintRevealed: false }">
                <div class="p-3" @click="hintRevealed = !hintRevealed" style="cursor: pointer; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-3">
                      <i class="fas fa-lightbulb" style="font-size: 1.1rem;" :style="hintRevealed ? 'color: #0066ff;' : 'color: #64748b;'"></i>
                      <div>
                        <div style="font-size: 0.65rem; color: #64748b; font-weight: 600; letter-spacing: 0.5px;">Intelligence</div>
                        <div class="text-dark" style="font-weight: 600; font-size: 0.85rem;">Access Encrypted Hint</div>
                      </div>
                    </div>
                    <i class="fas fa-chevron-down text-muted" :class="hintRevealed ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                  </div>
                  
                  <div x-show="hintRevealed" style="display: none;" class="mt-3 pt-3 border-top">
                    <div class="text-dark" style="font-size: 0.9rem;">
                      {{ challenge.hint | safe }}
                    </div>
                  </div>
                </div>
              </li>
              {% endif %}
            </ul>
          </div>
        </div>
      </div>

      <!-- BOTTOM ROW (SUBMIT) -->
      <div class="mt-4 p-4 mx-0 position-relative" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
        <!-- Custom blue left border -->
        <div style="position: absolute; left: 0; top: 15%; bottom: 15%; width: 4px; background: #0066ff; border-radius: 0 4px 4px 0;"></div>
        
        <h5 class="mb-3 d-flex align-items-center gap-2" style="color: #0066ff; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">
          <i class="fas fa-flag"></i> SUBMIT FLAG
        </h5>
        
        <div class="d-flex flex-column flex-md-row gap-3">
          <input type="text" class="form-control flex-grow-1 shadow-none" 
                 id="challenge-id"
                 placeholder="Challenge already solved" 
                 x-model="submission"
                 @keypress.enter="submitChallenge()"
                 style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; height: 50px; font-size: 0.95rem; color: #333;">
          <button class="btn d-flex align-items-center justify-content-center gap-2 px-3" 
                  @click="submitChallenge()"
                  style="background: #eef2ff; color: #0066ff; border-radius: 6px; font-weight: 700; font-size: 0.85rem; height: 50px; border: none; width: 130px; line-height: 1.2;">
            <i class="fas fa-paper-plane"></i>
            <div class="d-flex flex-column text-start">
                <span>SUBMIT</span>
                <span>FLAG</span>
            </div>
          </button>
        </div>
        
        <!-- Alerts/Errors -->
        <template x-if="response">
          <div class="mt-3 alert" :class="{'alert-success': response.data.status == 'correct', 'alert-danger': response.data.status != 'correct'}" role="alert" style="border-radius: 6px; font-weight: 500; padding: 12px 15px; margin-bottom: 0;">
            <i class="fas" :class="{'fa-check-circle': response.data.status == 'correct', 'fa-times-circle': response.data.status != 'correct'}" class="me-2"></i>
            <span x-text="response.data.message"></span>
          </div>
        </template>
      </div>

    </div>
  </div>
</div>"""

with open(challenge_html_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("challenge.html updated to exactly match image 1!")
