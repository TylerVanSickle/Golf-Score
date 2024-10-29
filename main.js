const courses = {
    "11819": "http://uxcobra.com/golfapi/course11819.txt",
    "18300": "http://uxcobra.com/golfapi/course18300.txt",
    "19002": "http://uxcobra.com/golfapi/course19002.txt"
  };
  
  function fetchCourseData(courseId) {
    fetch(courses[courseId])
      .then(response => response.json())
      .then(data => populateScorecard(data))
      .catch(error => console.error('Error fetching course data:', error));
  }
  
  function populateScorecard(courseData) {
    const holesContainer = document.getElementById('holes');
    holesContainer.innerHTML = ''; 
  
    const holes = courseData.data.holes;
  
    holes.forEach((hole, index) => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${hole.hole}</td>
        <td>${hole.teeBoxes[0].yards}</td>
        <td>${hole.teeBoxes[0].hcp}</td>
        <td>${hole.teeBoxes[0].par}</td>
        <td><input type="number" class="player-score" data-hole="${index + 1}" /></td>
        <td id="p1-out"></td>
        <td id="p1-in"></td>
        <td id="p1-total"></td>
      `;
      
      holesContainer.appendChild(row);
    });
  
    addScoreInputListeners();
  }
  
  function addScoreInputListeners() {
    const scoreInputs = document.querySelectorAll('.player-score');
    
    scoreInputs.forEach(input => {
      input.addEventListener('input', function () {
        const holeIndex = parseInt(this.dataset.hole);
        calculateScores(holeIndex);
      });
    });
  }
  
  function calculateScores() {
    let outScore = 0;
    let inScore = 0;
  
    const scoreInputs = document.querySelectorAll('.player-score');
  
    scoreInputs.forEach((input, index) => {
      const score = parseInt(input.value) || 0;
      
      if (index < 9) {
        outScore += score;
      } else {
        inScore += score;
      }
    });
  
    const totalScore = outScore + inScore;
  
    document.getElementById('p1-out').textContent = outScore;
    document.getElementById('p1-in').textContent = inScore;
    document.getElementById('p1-total').textContent = totalScore;
  }
  
  document.getElementById('course-select').addEventListener('change', function () {
    const courseId = this.value;
    fetchCourseData(courseId);
  });
  
  fetchCourseData('11819'); 
  