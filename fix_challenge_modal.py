import os

challenge_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\challenge.html"

new_content = """<div class="modal-dialog modal-xl" role="document" x-data="Challenge" x-init='id = {{ challenge.id }}; max_attempts = {{ max_attempts }}; attempts = {{ attempts }}; ratingValue = {{ (rating.get("value") if rating else None) | tojson }}; ratingReview = {{ (rating.get("review", "") if rating else None) | tojson }};'>
  <div class="modal-content" style="border: none; border-radius: 16px; background-color: #f8fafc; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
    
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

    <div class="modal-body p-4 p-md-5 position-relative" style="background-image: radial-gradient(circle at 10px 10px, #e2e8f0 1.5px, transparent 1.5px); background-size: 24px 24px;">
      
      <!-- Top Bar -->
      <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom" style="border-color: #e2e8f0 !important;">
        <button class="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2 p-0" data-bs-dismiss="modal" style="font-weight: 600;">
          <i class="fas fa-arrow-left"></i> 
          <span>Back to Challenges</span>
        </button>
        
        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center gap-3">
             <span style="color: #ff3333; border: 1px solid #ffccdd; background: #fff0f5; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">{{ diff_text | upper }}</span>
             <div class="d-flex gap-1 align-items-center">
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 1 %}background: #ff3333;{% else %}border: 1px solid #ccc; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 2 %}background: #ff3333;{% else %}border: 1px solid #ccc; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; {% if diff_bars >= 3 %}background: #ff3333;{% else %}border: 1px solid #ccc; background: transparent;{% endif %}"></div>
               <div style="width: 8px; height: 8px; border-radius: 50%; border: 1px solid #ccc; background: transparent;"></div>
             </div>
          </div>
          
          <div class="d-flex flex-column align-items-center" style="line-height: 1.1;">
            <span style="color: #0066ff; font-weight: 800; font-size: 1.4rem;">{{ challenge.value }}</span>
            <span style="color: #94a3b8; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px;">POINTS</span>
          </div>
          
          <button class="btn p-0 border-0 ms-2" data-bs-dismiss="modal" aria-label="Close" style="background: transparent; color: #111;">
            <i class="fas fa-times fs-4"></i>
          </button>
        </div>
      </div>

      <div class="row g-4 m-0">
        <!-- LEFT COLUMN -->
        <div class="col-lg-7 p-0 pe-lg-3">
          
          <!-- Header (Icon, Title) -->
          <div class="d-flex flex-column flex-sm-row gap-4 align-items-start mb-4">
            <div class="flex-shrink-0 d-flex align-items-center justify-content-center position-relative" style="width: 120px; height: 120px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 102, 255, 0.08);">
              <!-- Target corners -->
              <div style="position: absolute; top: 15px; left: 15px; width: 10px; height: 10px; border-top: 2px solid #0066ff; border-left: 2px solid #0066ff;"></div>
              <div style="position: absolute; top: 15px; right: 15px; width: 10px; height: 10px; border-top: 2px solid #0066ff; border-right: 2px solid #0066ff;"></div>
              <div style="position: absolute; bottom: 15px; left: 15px; width: 10px; height: 10px; border-bottom: 2px solid #0066ff; border-left: 2px solid #0066ff;"></div>
              <div style="position: absolute; bottom: 15px; right: 15px; width: 10px; height: 10px; border-bottom: 2px solid #0066ff; border-right: 2px solid #0066ff;"></div>
              
              <div style="width: 80px; height: 80px; background: radial-gradient(circle, #eef2ff 0%, #ffffff 70%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas {{ cat_icon }}" style="font-size: 2.5rem; color: #0066ff;"></i>
              </div>
            </div>
            
            <div class="mt-2">
              <div class="d-inline-flex align-items-center gap-2 mb-2 px-3 py-1" style="background: #eef2ff; color: #0066ff; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">
                <i class="fas fa-globe"></i> {{ challenge.category | upper }}
              </div>
              <h1 class="m-0 text-dark mb-2" style="font-weight: 800; font-size: 2.2rem;">{{ challenge.name }}</h1>
              <div class="d-flex align-items-center gap-2">
                <div style="width: 60px; height: 3px; background: #0066ff; border-radius: 2px;"></div>
                <div style="display: flex; gap: 4px;">
                  <div style="width: 4px; height: 4px; background: #e2e8f0; border-radius: 50%;"></div>
                  <div style="width: 4px; height: 4px; background: #e2e8f0; border-radius: 50%;"></div>
                  <div style="width: 4px; height: 4px; background: #e2e8f0; border-radius: 50%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Description Box -->
          <div class="p-4" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid #0066ff;">
            <h5 class="mb-4 d-flex align-items-center gap-2" style="color: #0066ff; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">
              <i class="far fa-file-alt"></i> DESCRIPTION
            </h5>
            
            <div class="text-dark mb-4" style="font-size: 0.95rem; line-height: 1.6;">
              {{ challenge.html | safe }}
            </div>
            
            {% if challenge.connection_info %}
            <div class="p-3 mt-4" style="background: #f4f6f9; border-radius: 8px; border: 1px solid #e2e8f0;">
              <div class="d-flex align-items-center gap-2 mb-2" style="color: #0066ff; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.5px;">
                <i class="fas fa-info-circle"></i> NOTE
              </div>
              <div class="text-dark" style="font-size: 0.9rem; font-family: monospace;">
                {{ challenge.connection_info }}
              </div>
            </div>
            {% endif %}
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
                <span class="d-flex align-items-center gap-3 text-dark" style="font-weight: 500; font-size: 0.9rem;">
                  <i class="fas fa-globe" style="color: #64748b;"></i> Category
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.category }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3 text-dark" style="font-weight: 500; font-size: 0.9rem;">
                  <i class="fas fa-signal" style="color: #64748b;"></i> Difficulty
                </span>
                <span style="color: #ff3333; font-weight: 600; font-size: 0.9rem;">{{ diff_text }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3 text-dark" style="font-weight: 500; font-size: 0.9rem;">
                  <i class="fas fa-trophy" style="color: #64748b;"></i> Points
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.value }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center mb-3 pb-3" style="border-bottom: 1px solid #f1f5f9;">
                <span class="d-flex align-items-center gap-3 text-dark" style="font-weight: 500; font-size: 0.9rem;">
                  <i class="far fa-user" style="color: #64748b;"></i> Solves
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ solves if solves != None else 0 }}</span>
              </li>
              
              <li class="d-flex justify-content-between align-items-center {% if not challenge.hint %}mb-0 pb-0 border-0{% else %}mb-3 pb-3{% endif %}" {% if challenge.hint %}style="border-bottom: 1px solid #f1f5f9;"{% endif %}>
                <span class="d-flex align-items-center gap-3 text-dark" style="font-weight: 500; font-size: 0.9rem;">
                  <i class="fas fa-pencil-alt" style="color: #64748b;"></i> Author
                </span>
                <span style="color: #0066ff; font-weight: 600; font-size: 0.9rem;">{{ challenge.author if challenge.author else "Aeries" }}</span>
              </li>
              
              {% if challenge.hint %}
              <li class="mt-4" x-data="{ hintRevealed: false }">
                <div class="p-3" @click="hintRevealed = !hintRevealed" style="cursor: pointer; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-3">
                      <i class="far fa-lightbulb" style="font-size: 1.2rem;" :style="hintRevealed ? 'color: #0066ff;' : 'color: #64748b;'"></i>
                      <div>
                        <div style="font-size: 0.7rem; color: #64748b; font-weight: 600;">Intelligence</div>
                        <div class="text-dark" style="font-weight: 700; font-size: 0.9rem;">Access Encrypted Hint</div>
                      </div>
                    </div>
                    <i class="fas" :class="hintRevealed ? 'fa-chevron-up text-primary' : 'fa-chevron-down text-muted'"></i>
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
      <div class="mt-4 p-4 mx-0" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid #0066ff;">
        <h5 class="mb-4 d-flex align-items-center gap-2" style="color: #0066ff; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">
          <i class="far fa-flag"></i> SUBMIT FLAG
        </h5>
        
        <div class="d-flex flex-column flex-md-row gap-3">
          <input type="text" class="form-control flex-grow-1 shadow-none" 
                 id="challenge-id"
                 placeholder="Challenge already solved" 
                 x-model="submission"
                 @keypress.enter="submitChallenge()"
                 style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; height: 50px; font-size: 0.95rem; color: #333;">
          <button class="btn d-flex align-items-center justify-content-center gap-2 px-4" 
                  @click="submitChallenge()"
                  style="background: #eef2ff; color: #0066ff; border-radius: 6px; font-weight: 700; font-size: 0.95rem; height: 50px; border: none; min-width: 160px;">
            <i class="far fa-paper-plane"></i> SUBMIT FLAG
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

print("challenge.html updated successfully!")
