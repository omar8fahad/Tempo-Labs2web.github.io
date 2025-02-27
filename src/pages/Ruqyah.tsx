import React from "react";
import { useNavigate } from "react-router-dom";
import DhikrList from "../components/DhikrList";

const ruqyahAdhkar = [
  {
    id: "r1",
    text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    translation:
      "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    source: "رواه مسلم",
    count: 3,
  },
  {
    id: "r2",
    text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation:
      "In the name of Allah, with Whose name nothing can cause harm on earth or in the heavens, and He is the All-Hearing, All-Knowing.",
    source: "رواه أبو داود والترمذي",
    count: 3,
  },
  {
    id: "r3",
    text: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ",
    translation:
      "In the name of Allah, I perform ruqyah for you, from everything that is harming you, from the evil of every soul or envious eye, may Allah heal you, in the name of Allah I perform ruqyah for you.",
    source: "رواه مسلم",
    count: 3,
  },
  {
    id: "r4",
    text: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    translation:
      "O Allah, Lord of mankind, remove the harm and heal, for You are the Healer, and there is no healing except Your healing, a healing that leaves no disease behind.",
    source: "رواه البخاري ومسلم",
    count: 3,
  },
  {
    id: "r5",
    text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ وَلَا يَزِيدُ الظَّالِمِينَ إِلَّا خَسَارًا",
    translation:
      "I seek refuge in Allah from the accursed Satan: And We send down of the Qur'an that which is a healing and a mercy to those who believe, and it increases the wrongdoers not except in loss.",
    source: "الإسراء: 82",
    count: 1,
  },
  {
    id: "r6",
    text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ وَالَّذِينَ لَا يُؤْمِنُونَ فِي آذَانِهِمْ وَقْرٌ وَهُوَ عَلَيْهِمْ عَمًى أُولَئِكَ يُنَادَوْنَ مِنْ مَكَانٍ بَعِيدٍ",
    translation:
      "I seek refuge in Allah from the accursed Satan: Say, 'It is, for those who believe, a guidance and cure.' And those who do not believe - in their ears is deafness, and it is upon them blindness. Those are being called from a distant place.",
    source: "فصلت: 44",
    count: 1,
  },
  {
    id: "r7",
    text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُمْ مَوْعِظَةٌ مِنْ رَبِّكُمْ وَشِفَاءٌ لِمَا فِي الصُّدُورِ وَهُدًى وَرَحْمَةٌ لِلْمُؤْمِنِينَ",
    translation:
      "I seek refuge in Allah from the accursed Satan: O mankind, there has come to you instruction from your Lord and healing for what is in the breasts and guidance and mercy for the believers.",
    source: "يونس: 57",
    count: 1,
  },
];

const Ruqyah = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleComplete = () => {
    // In a real app, we would save completion status to local storage or a database
    console.log("Ruqyah completed");
    navigate("/");
  };

  return (
    <DhikrList
      title="الرقية الشرعية"
      dhikrs={ruqyahAdhkar}
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
};

export default Ruqyah;
