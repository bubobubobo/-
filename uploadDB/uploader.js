const admin = require("firebase-admin");

const serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "collections");

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.error("Cannot scan directory: " + err);
  }

  /**
   * 파일의 이름을 collection으로 설정 => 폴더만 봐도 어떤 데이터인지 알 수 있도록 & DB의 구조와 동일하게
   * fs 사용해 collection별로 upload할 수 있도록 설정
   * 다른 라이브러리를 사용할 수 있도록 collections json파일에 collectionName을 property name으로 설정
   * Id를 매번 만들어줄 수 없으므로 자동생성하도록 doc() input 부분을 비워놓음 => uploader를 실행할 때는 db 초기화 필요
   * link : https://www.youtube.com/watch?v=Qg2_VFFcAI8
   * 실행 : $ node [directory]/uploader.js
   */
  files.forEach((file) => {
    const collectionName = file.substring(0, file.indexOf("."));
    const data = require("./collections/" + file)[collectionName];

    // 1. clear collection(question list)
    const clearCollection = async () => {
      try {
        const ref = firestore.collection(collectionName);
        const snapshot = await ref.get();
        snapshot.forEach((doc) => {
          ref.doc(doc.id).delete();
        });
      } catch (err) {
        console.error("Cannot delete document: " + err);
      }
    };

    clearCollection();

    // 2. initialize collection
    data.forEach(async (q) => {
      try {
        const { question, answer, link } = q;
        await firestore
          .collection(collectionName)
          .doc()
          .set({ question, answer, link });
      } catch (err) {
        console.error("Cannnot upload question: " + err);
      }
    });
  });
});
