import { fetchDocument } from "tripledoc"
import { rdf } from "rdf-namespaces"
import { login } from "./login"



async function isA (profileIri, typeIri)
{
  const profileDocument = await fetchDocument(profileIri)
  const profile = profileDocument.getSubject(profileIri)
  // Here we see another type of artifact, for references libraries
  return profile.getAllRefs(rdf.type).includes(typeIri)
}


async function addType (profileIri, typeIri)
{
  // In order to write to a pod, you must be logged in
  await login()
  const profileDocument = await fetchDocument(profileIri)
  const profile = profileDocument.getSubject(profileIri)
  profile.addRef(rdf.type, typeIri)
  // The changes are persisted when the document is saved
  await profileDocument.save()
}


exports.isA = isA
exports.addType = addType
