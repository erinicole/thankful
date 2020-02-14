// import * as counter from './test.js';
import { getDate } from './test.js';

console.log(getDate);

  
  //the constants from the html doc
  let button = document.querySelector(".button");
  let allPrompts = document.querySelectorAll(".not-asked");
  let allAnswers = document.querySelectorAll("#user-response");
  let finalAnswers = []
  let notAsked = "not-asked"
  let asking = "asking"
  let asked = "asked"
  let clicks = 0
  
  function * moveToNextQuestion(sections, asking, notAsked, asked) {
    for (let i = 0; i < sections.length; i++) {
      // element.classList.remove(removeOne)
      const element = sections[i]
      if (i === 0){
        element.classList.add(asking);
        element.classList.remove(notAsked);
        console.log("one")
      } else if (i === 1){
        sections[0].classList.remove(asking);
        sections[0].classList.add(asked)
        element.classList.remove(notAsked);
        element.classList.add(asking)
        console.log("two")
      } else if (i === 2){
        sections[1].classList.remove(asking);
        sections[1].classList.add(asked)
        element.classList.remove(notAsked);
        element.classList.add(asking)
        console.log("three")
      }
      console.log("hi");
      yield    
    }

  }

  let addClassToSections = moveToNextQuestion(allPrompts, asking, notAsked, asked);

  //this compiles all of the user generated answers into one array
  let getTheAnswers = () => {
    for (let i = 0; i < allAnswers.length; i++) {
      finalAnswers.push(allAnswers[i].value)
    }
    return finalAnswers
  }

  let downloadFile = (getTheAnswers) => {
    let fileElement = document.createElement("a");
    fileElement.style.display = "none";
    fileElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(getTheAnswers()));

    fileElement.setAttribute('download', "Thankful Journal");
    document.body.appendChild(fileElement);

    fileElement.click();

    document.body.removeChild(fileElement);

  }

  let reloadWindow = async(downloadFile) => {
    await downloadFile
    await alert("Your thankful thoughts have downloaded. This window will reload to reset your next thoughtful notes")
    window.location.reload();
  }

  // after the button is clicked after the last prompt, the below allows more actions to happen 
  button.addEventListener('click', () => {
    clicks++
    console.log(clicks)
    if (addClassToSections.next().done){ 
      lastAsking = document.querySelector(".asking");
      lastAsking.classList.remove(asking);
      lastAsking.classList.add(asked);
      console.log("i am finished")
    }
    if (clicks === 3){
      button.innerHTML = "Download Today's Thoughts"
    }
    if (clicks === 4){
      reloadWindow(downloadFile(getTheAnswers))
    } 
  });
