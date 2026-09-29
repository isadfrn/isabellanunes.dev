import { onEachPage } from "./lifecycle";
import { mountScene } from "./sceneController";

// Loaded by components/scene/SceneStage.astro.
onEachPage(mountScene);
