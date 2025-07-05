import {atom} from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        basic: {
            name: '',
            email: '',
            rank: -1,
            isLoggedIn: false
        },
        profilePic: '',
        socials: {
            githubUrl: '',
            linkedInUrl: '',
            xUrl: ''
        },
        notifications:[],
        address: {
            city: '',
            state: ''
        },
        activity: {
            projectsFloated: 0,
            jobsFloated: 0,
            internshipsFloated: 0
        },
        collegeDetails: {
            branch: '',
            batch: ''
        },
        jobRelated: {
            company: '',
            jobTitle: '',
        }
    }
})
