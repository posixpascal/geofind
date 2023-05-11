# gmf

A geographic map framework for building interactive map quizzes. Heavily battle tested on geofind.io. Outputs to SVGs, maplibreGL and possibly other engines. 

Fully typed and tested. Take a look at our examples below or use the playground at: gmf.geofind.io/playground/


```typescript
gmf({
    map: WORLD,
    questions: [
        {
            title: "Where do Penguins live?",
            kind: ANIMAL,
            
            locations: [
                Location.byName("Antarctica").withMeta({
                    CORRECT: 1,
                    onHit(){}
                }),
                Location.byName("North Pole").withMeta({
                    CORRECT: 0,
                    onHit(){}
                })
            ],
            
        }
    ]
})
```

This package provides an unstyled UI system for implementing various UI flows inside the game, map or question.

For example, you can show and hide the experience bar at your own will:
```typescript
gmf({
    map: WORLD,
    questions: [
        {
            title: "Where do Penguins live?",
            onQuestionStart({ ui }){
                ui.experienceBar.hide();
            },
            
            onQuestionEnd({ ui }){
                ui.experienceBar.show();
            }
        }
    ]
})
```