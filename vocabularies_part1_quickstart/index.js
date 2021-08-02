import OBELISK from "./OBELISK"
import { isA, addType } from "./profile"


// You can change this to your own IRI
const myWebId = "https://cleopatra.solidcommunity.net/profile/card#me"

const webIds = [
  myWebId,
  // This is a known scultptor
  "https://vuittonluis.solidcommunity.net/profile/card#me",
]


const app_el = document.getElementById("app")
const app_2_el = document.getElementById("app_2")
const make_sculptor_el = document.getElementById("make_sculptor")
const current_web_id_el = document.getElementById("current_web_id")


function addClickHandlers ()
{
  make_sculptor_el.addEventListener("click", () =>
  {
    app_2_el.innerHTML += `<br/>Requesting to make: "${myWebId}" a sculptor (this comes from "myWebId" in vocabularies_quickstart/index.js which you can change)<br/>`
    const result = makeMeASculptor(myWebId)

    result.then(s =>
      {
        console.log("success", s)
        app_2_el.innerHTML += "<br/>success<br/>"
        findIfSculptor(myWebId, app_2_el)
      })
      .catch(e =>
      {
        console.error("error", e)
        app_2_el.innerHTML += "<br/>" + e
      })
  })
}


async function findIfSculptor (webId, element)
{
  // Here, we read if the profile attached to the webId is an obelisk:Sculptor
  // To do so, we use our generated artifact to get an IRI
  const isASculptor = await isA(webId, OBELISK.Sculptor.value)

  displaySculptorStatus(isASculptor, webId, element)
}


function displaySculptorStatus (isASculptor, webId, element)
{
  if (isASculptor) {
    // Here, the generated artifact provides a label
    element.innerHTML += `[${webId}] is a [${OBELISK.Sculptor.labelInLang()}]`
  } else {
    element.innerHTML += `[${webId}] is not a [${OBELISK.Sculptor.labelInLang()}], but certainly an obelisk enthusiast`
  }

  element.innerHTML += "<br/><br/>"
}



function displayApp2 ()
{
  app_2_el.style.display = ""
  current_web_id_el.innerHTML = myWebId
}


async function makeMeASculptor (webId) {
  return await addType(webId, OBELISK.Sculptor.value)
}



async function main ()
{
  addClickHandlers()


  for (let i = 0; i < webIds.length; ++i)
  {
    const webId = webIds[i]
    await findIfSculptor(webId, app_el)
  }


  displayApp2()
}

main()
