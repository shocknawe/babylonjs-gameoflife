import Grid from '../models/Grid';
import BabylonScene from "./BabylonScene";
import {FreeCamera, Vector3, Color3, CubeTexture, PBRMaterial, HemisphericLight, MeshBuilder} from "@babylonjs/core";
import {gsap} from "gsap";
import {cellColors} from "../models/Cell";

const AppConstants = {
  WIDTH: 40,
  HEIGHT: 40,
}

function App() {
  const getInitialState = () => {
    var initialState = [],
      randomBinary;

    for (var yy=0; yy<AppConstants.WIDTH; yy++) {
      initialState[yy] = [];
      for (var xx = 0; xx < AppConstants.WIDTH; xx++) {
        randomBinary = Math.floor((Math.random() * 2));
        initialState[yy][xx] = randomBinary;
      }
    }
    return initialState;
  }

  const onSceneReady = (scene) => {
    // Game of life grid
    const grid = new Grid(AppConstants.WIDTH, AppConstants.HEIGHT, getInitialState());

    scene.clearColor = Color3.Black();
    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("./textures/environment.dds", scene);
    scene.createDefaultSkybox(scene.environmentTexture);

    // Lights
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Camera
    const canvas = scene.getEngine().getRenderingCanvas();
    const camera = new FreeCamera("camera1", new Vector3(0, 8, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);


    const whiteTexture = new PBRMaterial("whitePbr", scene);
    whiteTexture.metallic = 0.0;
    whiteTexture.roughness = 0;
    whiteTexture.subSurface.isRefractionEnabled = true;
    whiteTexture.subSurface.tintColor = new Color3.White();

    const blackTexture = new PBRMaterial("blackPbr", scene);
    blackTexture.metallic = 0.0;
    blackTexture.roughness = 0;
    blackTexture.subSurface.isRefractionEnabled = true;
    blackTexture.subSurface.tintColor = new Color3.Black();

    const whiteToBlackTexture = new PBRMaterial("whiteToBlackPbr", scene);
    whiteToBlackTexture.metallic = 0.0;
    whiteToBlackTexture.roughness = 0;
    whiteToBlackTexture.subSurface.isRefractionEnabled = true;

    const blackToWhiteTexture = new PBRMaterial("blackToWhitePbr", scene);
    blackToWhiteTexture.metallic = 0.0;
    blackToWhiteTexture.roughness = 0;
    blackToWhiteTexture.subSurface.isRefractionEnabled = true;

    var spheres = [],
      sphere,
      cell;

    const sphereDiameter = .9,
      gutter = .1,
      halfWidth = Math.floor(AppConstants.WIDTH * (1 + gutter) / 2),
      halfHeight = Math.floor(AppConstants.HEIGHT * (1 + gutter) / 2);

    for (var yy=0; yy<AppConstants.WIDTH; yy++) {
      spheres[yy] = [];
      for (var xx=0; xx<AppConstants.WIDTH; xx++) {
        sphere = MeshBuilder.CreateSphere("sphere" + xx + '-' + yy, {
          diameter: sphereDiameter,
        });
        sphere.position = new Vector3(
          xx * (1 + gutter) - halfWidth,
          1,
          yy * (1 + gutter) - halfHeight,
        );
        spheres[yy][xx] = sphere;

        cell = grid.cells[yy][xx];
        if (cell.isAlive) {
          sphere.material = blackTexture;
        } else {
          sphere.material = whiteTexture;
          sphere.scaling.y = .1;
        }
      }
    }

    setInterval(() => {
      // Next step of Game of life
      grid.step();

      // Animate texture
      whiteToBlackTexture.subSurface.tintColor = Color3.White();
      blackToWhiteTexture.subSurface.tintColor = Color3.Black();
      gsap.to(whiteToBlackTexture.subSurface.tintColor, {r: 0, g: 0, b: 0, duration: .9});
      gsap.to(blackToWhiteTexture.subSurface.tintColor, {r: 1, g: 1, b: 1, duration: .9});

      // Render state of grid
      var sphere, cell;
      for (var yy=0; yy<AppConstants.WIDTH; yy++) {
        for (var xx = 0; xx < AppConstants.WIDTH; xx++) {
          sphere = spheres[yy][xx];
          cell = grid.cells[yy][xx];

          switch (cell.color) {
            case cellColors.WHITE:
              sphere.material = whiteTexture;
              break;
            case cellColors.BLACK:
              sphere.material = blackTexture;
              break;
            case cellColors.WHITETOBLACK:
              sphere.material = whiteToBlackTexture;
              break;
            case cellColors.BLACKTOWHITE:
              sphere.material = blackToWhiteTexture;
              break;
            default:
              sphere.material = whiteTexture;
          }
          if (cell.isAlive) {
            gsap.to(sphere.scaling, {y: 1, duration: .9});
            gsap.to(sphere.position, {y: 1 + .3, duration: .9});
          } else {
            gsap.to(sphere.scaling, {y: .1, duration: .9});
            gsap.to(sphere.position, {y: 1, duration: .9});
          }
        }
      }
    }, 1000);

    // grid.cells
  };

  return (
    <div className="App" data-test="app">
      <BabylonScene antialias onSceneReady={onSceneReady} id="my-canvas" />
    </div>
  );
}

export default App;
