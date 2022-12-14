import { getRequests, deleteRequest, getPlumbers, sendCompletion, getCompletions, deleteCompletion } from "./dataAccess.js"

const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>
    </li>
`
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map((request) => convertRequestToListElement(request)).join("")
        }
        </ul>
    `

    return html
}
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()

            }
            sendCompletion(completion)
        }

    }

)


const convertCompletionToListElement = (completion) => {
    const plumbers = getPlumbers()
    const requests = getRequests()
    for (const request of requests) {
        if (request.id == completion.requestId) {

            return `
    <li>${request.description}
        ${plumbers.map(
                plumber => {
                    if (plumber.id == completion.plumberId)
                        return `${plumber.name}`
                }
            ).join("")
                }
        <button class="request__delete"
                id="completion--${completion.id}">
            Delete
        </button>
    </select>
    </li>
`
        }
    }
}

export const Completions = () => {
    const completions = getCompletions()

    let html = `
        <ul>
            ${completions.map((completion) => convertCompletionToListElement(completion)).join("")
        }
        </ul>
    `

    return html
}
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("completion--")) {
        const [, completionId] = click.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})