import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: 'https://xdsmgyjuwrsmlvtwsjyu.supabase.co/storage/v1/object/public/Mind%20Bucket/musicband.mind?t=2024-12-13T22%3A43%3A43.676Z',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const gltf = await loadGLTF('https://xdsmgyjuwrsmlvtwsjyu.supabase.co/storage/v1/object/public/gltf%20bucket/pikachu.gltf?t=2024-12-13T22%3A29%3A17.581Z');
    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.set(0, -0.4, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      gltf.scene.rotation.set(0, 0, 0);
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();
});
