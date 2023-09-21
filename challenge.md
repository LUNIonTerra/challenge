# Challenge
Develop MVP system that consist:
- blockchain
- backend
- mobile app (further denoted as `App`)

## Submission
1. Deadline - end of business week
2. Solution should be provided as:
    - repo 
    - working example:
        - contract deployed,
        - backend as one click to deploy or hosted for 2 weeks
        - mobile app as TestFlight link(preferred) or source code


## Goal
Aim of this exercise is to evaluate **working** solution. Evaluation focus on code quality, proposed solution (additional consideration why such stack/implementation was chosen will be a `+`). Please note that [Optionals](#optionals) features should at least be described.  

In case of problems with implementation apply `FizzBuzz` approach - cut requirements and try to provide whole suite. Than If possible add features to meet requirements/goal. For missing features please provide description how given solution would be implemented and why.  

UX / UI will not contribute to evaluation score.   
Proposed API/names are only suggestion and can be modified freely to match implementation.  

## Story
1. User open App and create account - fills `username` and links polygon wallet. User data is stored in backend. 
2. User take picture. If `banana` is detected on picture, custom contracts `score` for given user is increased.
3. Admin is able to verify live stats on backend - number of users, their `usernames` and associated `banana` score as well as `Token` balance.
   Backend and blockchain should be in sync

Note that how/where detection is made is up to you.

### Optionals
Bonus tasks to show your strength in given area. They will provide extra points to score **when implemented**.   
**Brief description on how to implement solution for them is required**

## Mobile app
iOS app which enable creation of account consisting `username` and `counter` and linked wallet.  
- User should be able to view how much `Token` he has
- User should be able to view `banana` counter in app
- User should be able to take photo and if `banana` found increase contract counter(score) for his wallet address
    Service Level Agreement (SLA) for banana detection is 300ms (could be implemented on mobile/backend/3-rd party)

### Optionals
1. Live detection of [serek mój ulubiony](http://sdmwiel.pl/?page_id=56) on device (user see if `serek` was found when camera is rolling and is able to take photo with detected object)
2. Creation of Polygon wallet in mobile app
3. Android app

## Blockchain
On Polygon testnet or mainnet deploy ERC721 token and corresponding custom smart-contract.

###  Token 
Ordinary ERC721 token (Denoted as `Token`)

### Custom contract
Counter contract which hold counter on found items (`score`).
- On demand create new key (user)
- On demand increment value for given user (only given user can trigger this)
- It is possible to list given user score

### Optionals
1. It is possible to list all users and they scores
2. It is possible to get total scores (sum of all user scores)

## Backend
Backend with persisting storage for bookkeeping. 
- When user is created corresponding entry is created - `username`, `score`, `wallet address`
- Admin can view stats on webpage - number of users, their `score`, `wallet address` and `Token` amount. 

### Optionals

1. Assume that user have potato not phone and detection has to be made in backend. Photo is send to backend and `banana detection service` tags if it has banana or not. 
Secondary service - `counterfeiting detection `is also in place. 
SLA for response is 200ms, where `counterfeiting detection` is taking 150ms. Implement solution that hods SLA.
2. Add self healing capability to backend

