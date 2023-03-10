import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
// import * as ReactNativePhash from "react-native-phash";
import {
  getImagesPHashIterative,
  getImagesPHashConcurrently,
  findSimilarIterative,
  findSimilarIterativeKDTree,
  findSimilarConcurrentlyPartial,
  addListener,
  findSimilarIterativeKDTreeFlexible,
  findSimilarConcurrently,
  findSimilarConcurrentlyFlexible,
  findDuplicatesFlexible,
  findDuplicates,
  groupPhotos, findSimilarIterativeFlexible
} from "react-native-phash";

const pHashCalculatedSubscription = addListener(
  "pHash-calculated",
  ({ finished, total }) => {
    const percentage = Math.floor((finished / total) * 10000) / 100;
    // console.log(`pHash-calculated: ${percentage}%`);
    console.log(`pHash-calculated: ${finished}`);

    // if (percentage >= 100) {
    //   pHashCalculatedSubscription.remove();
    // }
  }
);

const hashCalculatedSubscription = addListener(
  "md5-calculated",
  ({ finished, total }) => {
    const percentage = Math.floor((finished / total) * 10000) / 100;
    console.log(`md5-calculated: ${percentage}%`);

    // if (percentage >= 100) {
    //   hashCalculatedSubscription.remove();
    // }
  }
);

const calcAndLog1 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 200,
    mediaType: "photo",
  });

  const imagesPerceptualHashes = await getImagesPHashIterative(
    assets.map((asset) => asset.id),
    {
      maxCacheSize: 0,
    }
  );
  console.log(JSON.stringify(imagesPerceptualHashes, null, 2));
  console.log(imagesPerceptualHashes.length);
};

const calcAndLog2 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 200,
    mediaType: "photo",
  });

  const imagesPerceptualHashes = await getImagesPHashConcurrently(
    assets.map((asset) => asset.id),
    {
      maxCacheSize: 0,
      concurrentBatchSize: 1,
      maxConcurrent: 10000,
    }
  );
  console.log(JSON.stringify(imagesPerceptualHashes, null, 2));
  console.log(imagesPerceptualHashes.length);
};

const calcAndLog3 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 200,
    mediaType: "photo",
  });

  const similarImages = await findSimilarIterative(
    assets.map((asset) => asset.id),
    {
      maxCacheSize: 0,
      maxHammingDistance: 40,
    }
  );
  console.log(JSON.stringify(similarImages, null, 2));
  console.log(similarImages.length);
};

const calcAndLog5 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 1000,
    mediaType: "photo",
  });

  const similarImagesKDTree = await findSimilarConcurrentlyPartial(
    assets.map((asset) => asset.id),
    {
      maxCacheSize: 200,
      concurrentBatchSize: 50,
      maxConcurrent: 100,
      nearestK: 1,
      hashAlgorithmName: "pHash",
      maxHammingDistance: 1,
    }
  );
  console.log(JSON.stringify(similarImagesKDTree, null, 2));
  console.log(similarImagesKDTree.length);
};

const calcAndLog6 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 1000,
    mediaType: "photo",
  });

  const similarImagesKDTree = await findSimilarConcurrently(
    assets.map((asset) => asset.id),
    {
      maxCacheSize: 0,
      concurrentBatchSize: 50,
      maxConcurrent: 100,
      nearestK: 10,
      hashAlgorithmName: "pHash",
      maxHammingDistance: 1,
    }
  );
  console.log(JSON.stringify(similarImagesKDTree, null, 2));
  console.log(similarImagesKDTree.length);
};

const calcAndLog9 = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    first: 1000,
    mediaType: "photo",
  });

  const groups = await groupPhotos(assets.map((asset) => asset.id));
  console.log(JSON.stringify(groups, null, 2));
  console.log(groups.length);
};

export default function App() {
  const [duplicates, setDuplicates] = useState<string[][]>([]);

  const calcAndLog8 = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 1000,
      mediaType: "photo",
    });

    const duplicates = await findDuplicatesFlexible(
      assets.map((asset) => asset.id),
      {
        maxCacheSize: 0,
      }
    );
    setDuplicates(duplicates);
    console.log(JSON.stringify(duplicates, null, 2));
    console.log(duplicates.length);
  };

  const calcAndLog4 = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 1000,
      mediaType: "photo",
    });

    const similarImagesKDTree = await findSimilarIterativeKDTreeFlexible(
      assets.map((asset) => asset.id),
      {
        maxCacheSize: 0,
        nearestK: 10,
        maxHammingDistance: 10,
        hashAlgorithmName: "pHash",
      }
    );

    setDuplicates(similarImagesKDTree);

    console.log(JSON.stringify(similarImagesKDTree, null, 2));
    console.log(similarImagesKDTree.length);
  };

  const calcAndLog9 = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 1000,
      mediaType: "photo",
    });

    const similarImagesKDTree = await findSimilarIterativeFlexible(
      assets.map((asset) => asset.id),
      {
        maxCacheSize: 0,
        nearestK: 10,
        maxHammingDistance: 10,
        hashAlgorithmName: "pHash",
      }
    );

    setDuplicates(similarImagesKDTree);

    console.log(JSON.stringify(similarImagesKDTree, null, 2));
    console.log(similarImagesKDTree.length);
  };

  const calcAndLog7 = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 1000,
      mediaType: "photo",
    });

    const similarImagesKDTree = await findSimilarConcurrentlyFlexible(
      assets.map((asset) => asset.id),
      {
        maxCacheSize: 0,
        concurrentBatchSize: 50,
        maxConcurrent: 100,
        nearestK: 10,
        hashAlgorithmName: "pHash",
        maxHammingDistance: 1,
      }
    );

    setDuplicates(similarImagesKDTree);

    console.log(JSON.stringify(similarImagesKDTree, null, 2));
    console.log(similarImagesKDTree.length);
  };

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log('GRANT PERMISSIONS!');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello there!</Text>
      <Button title="getImagesPHashIterative" onPress={calcAndLog1} />
      <Button title="getImagesPHashConcurrently" onPress={calcAndLog2} />
      <Button title="findSimilarIterative" onPress={calcAndLog3} />
      <Button title="findSimilarIterativeFlexible" onPress={calcAndLog9} />
      <Button title="findSimilarIterativeKDTreeFlexible" onPress={calcAndLog4} />
      <Button title="findSimilarConcurrentlyPartial" onPress={calcAndLog5} />
      <Button title="findSimilarConcurrently" onPress={calcAndLog6} />
      <Button title="findSimilarConcurrentlyFlexible" onPress={calcAndLog7} />
      <Button title="findDuplicatesFlexible" onPress={calcAndLog8} />
      <Button title="groupPhotos" onPress={calcAndLog9} />

      <ScrollView style={styles.imagesBlock}>
        {duplicates.map((duplicate) => (
          <>
            <ScrollView horizontal key={JSON.stringify(duplicate)}>
              {duplicate.map((imageId) => (
                <Image
                  key={imageId}
                  style={styles.image}
                  source={{ uri: `ph://${imageId}` }}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesBlock: {
    flex: 1,
  },
  image: {
    height: 250,
    width: 180,
    margin: 4,
  },
});
