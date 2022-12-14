import { ServiceForm } from "./ServiceForm.js"
import { Completions, Requests } from "./Requests.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
        <section class="completedService">
        <h2>Completed Services</h2>
        ${Completions()}
    </section>
    `
}