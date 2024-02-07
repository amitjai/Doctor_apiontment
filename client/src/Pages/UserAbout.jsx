import React from 'react'
import Layout from './Layout'

function UserAbout() {
  return (
    <Layout>
        <div className="mx-auto w-[1000px]">
            <h1 className='uppercase font-bold text-2xl text-center mb-3'>Abouts</h1>
            <p className='pl-3'>If you're preparing for a doctor's appointment, here are some guidelines to help you make the most of your visit and ensure effective communication with your healthcare provider:</p>
            <ul>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Schedule the Appointment:</h1>
                    <p className='pl-3'>* Call the doctor's office in advance to schedule an appointment. <br />* If it's a follow-up visit, mention any changes in your condition since your last appointment.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Prepare Relevant Information:</h1>
                    <p className='pl-3'>* Make a list of your symptoms, concerns, and any questions you may have. <br />* Bring a list of all current medications, including dosage and frequency.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Medical History:</h1>
                    <p className='pl-3'>* Be prepared to provide your medical history, including any chronic conditions, surgeries, or hospitalizations.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Insurance and Identification:</h1>
                    <p className='pl-3'>* Bring your insurance card and any necessary identification.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Arrive Early</h1>
                    <p className='pl-3'>* Arrive at the doctor's office a little early to complete any necessary paperwork.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Ask Questions</h1>
                    <p className='pl-3'>* Don't hesitate to ask questions about your condition, treatment options, or any concerns you may have. <br />
                    * Write down the answers or ask for written information for reference.</p>
                </li>
                <li>
                    <h1 className='font-bold py-1 text-lg'>Emergency Contact Information</h1>
                    <p className='pl-3'>* Provide updated emergency contact information, especially if there have been any changes since your last visit.</p>
                </li>
            </ul>
        </div>
        
    </Layout>
  )
}

export default UserAbout