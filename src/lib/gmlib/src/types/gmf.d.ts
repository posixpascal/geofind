
type Lang = "de" | "en";
type Localize<Property, Subset = Lang> = Partial<Record<`${Property}_${Subset}`, string>>

interface Context {
    ui: UI,
    game: GameConfiguration,
}

/**
 *
 */
enum SubjectKind {
    EXPLICIT_ANIMAL = "EXPLICIT_ANIMAL",
    EXPLICIT_COUNTRY = "EXPLICIT_COUNTRY",
    EXPLICIT_CAPITAL = "EXPLICIT_CAPITAL",
    EXPLICIT_CONTINENT = "EXPLICIT_CONTINENT",
    GENERIC_POINT = "GENERIC_POINT",
    GENERIC_POLYGON = "GENERIC_POLYGON",
}

type QuestionSubjectHooks = "PinPlaced" | "LocationCorrect" | "LocationIncorrect";

interface QuestionSubject {
    kind: SubjectKind,
    locations: SubjectLocation[],
    experience: number,
    hooks?: Hooks<QuestionSubjectHooks>
}

type QuestionHooks = 'QuestionStart' | 'QuestionEnd';
type HookCallback = (context: Context, ...rest: any) => void;
type Hooks<T> = Partial<Record<`on${T}` | `after${T}` | `before${T}`, HookCallback>>;

interface Question {
    title: Localize<'title'>
    subjects: QuestionSubject[]
    hooks?: Hooks<QuestionHooks>,
    experience?: number;
}


type  GameHooks = "GameStarted" | "GameEnded" | "UserJoined" | "UserLeft"
interface GameConfiguration {
    renderer: Renderer,
    questions: Question[],
    hooks?: Hooks<GameHooks>
}