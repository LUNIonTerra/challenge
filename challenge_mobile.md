# Challenge
Develop MVP system that consist:
- mobile app (further denoted as `App`)

## Submission
1. Deadline - end of business week
2. Solution should be provided as:
    - repo 
    - working example:
        - mobile iOS app as TestFlight link(preferred) or source code 

## Goal
Aim of this exercise is to evaluate **working** solution. Evaluation focus on code quality, proposed solution (additional consideration why such stack/implementation was chosen will be a `+`). Please note that [Optionals](#optionals) features should at least be described.  

In case of problems with implementation apply `FizzBuzz` approach - cut requirements and try to provide whole suite. Than If possible add features to meet requirements/goal. For missing features please provide description how given solution would be implemented and why.  

UX / UI will not contribute to evaluation score.
Proposed API/names are only suggestion and can be modified freely to match implementation.  

## Story
1. User open App and create account - fills `username` and links polygon wallet. 
2. User take picture. If `banana` is detected or classified in picture.
3. User is able to display cube or other simple shape in AR

### Optionals
Bonus tasks to show your strength in given area. They will provide extra points to score **when implemented**.   
Weight of optionals counted from beginning (first has highest relevance)  
**Brief description on how to implement solution for them is required**

## Mobile app
iOS app which enable creation of account consisting `username` and linked wallet.  
- User should be able to link `metamask` or `walletConnect` wallet
- User should be able to view `matic` balance in app
- User should be able to take photo and if `banana` found increase counter stored in app
- Detection or classification of banana should be done on edge (mobile) with one of models: YOLO/ResNet/EfficientNet/Other. For simplification google [imagenet](https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/). Banana has class 954
- User is able to display in AR some simple shape which stay in same spot in space. No other interaction need.

As for mobile OS support for challenge there is no limitations for OS version.

### Optionals
1. Android app
2. Live detection / classification of `banana` from camera feed
3. Add integration with Unity / Unreal Engine to use assets from there engines (instead of cube in AR display car or any other asset from Unity/UE)
4. In AR mode with live detection score is displayed in some spot in space (preferable near banana)
5. Limit OS for >= Android 26 and >= iOS 16 
6. After signing operation in external wallet user should be brought back to app
7. Creation of Polygon wallet in mobile app
8. Add WalletConnect or metamask integration (integrate complementary to base solution)
