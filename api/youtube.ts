// https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&channelId=UCC7jJl8kh7M9OyZdjIXOYYw&maxResults=20&order=date&publishedAfter=2013-12-28T19%3A07%3A52.000Z&type=video&prettyPrint=true&key=[YOUR_API_KEY]
//
import { ky } from "../deps.ts";
// TODO : OBTAIN FOLLOWING PAGES

const API_KEY = Deno.env()["YOUTUBE_KEY"];

// UCtcQ6TPwXAYgZ1Mcl3M1vng
export const getPlaylists = async (
  channelId: string
): Promise<YoutubeResponse<PlaylistInfo>> => {
  console.log("Requesting playlists for " + channelId);
  let parsed;
  try {
    parsed = await ky
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=id%2Csnippet&channelId=${channelId}&maxResults=50&prettyPrint=true&key=${API_KEY}`
      )
      .json();
    console.log("Information retrieved successfully");
    console.log(parsed);
    return parsed;
  } catch (err) {
    console.log("Error obtaining playlists");
    console.log(err);
    throw err;
  }
};

// PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4
export const getPlaylistItems = async (
  playlistId: string
): Promise<YoutubeResponse<PlaylistItemInfo>> => {
  console.log("Requesting playlist items for " + playlistId);
  let parsed;
  try {
    parsed = await ky
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&prettyPrint=true&key=${API_KEY}`
      )
      .json();
    console.log("Playlist items retrieved successfully");
    console.log(parsed);
    return parsed;
  } catch (err) {
    console.log("Error obtaining playlist items");
    console.log(err);
    throw err;
  }
};

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeResponse<T> {
  kind: string;
  etag: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
  items: T[];
}

export interface PlaylistInfo {
  kind: string;
  etag: string;
  id: string;
  snippet: PlaylistSnippet;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default?: Thumbnail;
  medium?: Thumbnail;
  high?: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}

export interface PlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: String;
  localized: {
    title: string;
    description: string;
  };
}

export interface PlaylistItemInfo {
  kind: string;
  etag: string;
  id: string;
  snippet: PlaylistItemSnippet;
}

export interface PlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

const exampelPlaylistResponse: YoutubeResponse<PlaylistItemInfo> = {
  kind: "youtube#playlistItemListResponse",
  etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/TmSO5Qd7E5xReoLkM_8J9rwWGvA"',
  pageInfo: {
    totalResults: 14,
    resultsPerPage: 50,
  },
  items: [
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/WGmNkcmZ7d5d-xpeXQyj3HtDnRI"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC41NkI0NEY2RDEwNTU3Q0M2",
      snippet: {
        publishedAt: "2019-11-14T21:49:06.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "The Quality of Calories: Competing Paradigms of Obesity Pathogenesis, a Historical Perspective",
        description:
          "“What scientists do and what journalists do are similar in that we’re both supposed to be establishing reliable knowledge about the universe,” Gary Taubes told the audience at the annual CrossFit Health Conference on July 31, 2019. Taubes, an award-winning investigative journalist, has spent the last several decades turning a critical eye toward places where received wisdom in the fields of science and medicine has diverged from reliable knowledge. In this presentation, he evaluates what the experts say about why we get fat and explains why he has become a critic of the consensus.\n\nIn assessing the scientific evidence related to the question of why we get fat, Taubes uncovers two hypotheses about the relationship between obesity and various metabolic diseases that lead to premature death. Each hypothesis is associated with unique assumptions about the driving cause of obesity. The first hypothesis suggests obesity causes metabolic diseases. The second suggests whatever causes obesity causes these diseases.\n\nThe World Health Organization provides an example of the conventional wisdom associated with the first hypothesis: “The fundamental cause of obesity and overweight is an energy imbalance between calories consumed and calories expended.”\n\nIn his research, Taubes sought out the origin of this idea about energy balance. He found it dates to the 1860s and the birth of modern nutrition science in Germany, specifically with the invention of the calorimeter, which measures energy expenditure.\n\n“Our ideas are dependent on the technologies we have to observe the universe,” Taubes explains. “So if all you could observe related to obesity is the intake and expenditure of energy, you end up with a theory related to the intake and expenditure of energy.”\n\nTaubes asks several questions that reveal the problems inherent in the energy balance model: Why don’t obese people compensate by eating less or exercising more? Why is it that some people can be thin without starving? We know men and women develop fat tissue differently, so what is determining the specific areas where fat accumulates? If we know puberty is adipogenic (fat-accumulating) for girls but not boys, why don’t we talk about hormonal forces determining fat accumulation when we talk about these caloric imbalance issues?\n\nAfter pointing to several holes in the energy balance hypothesis, Taubes explains his reasons for supporting the alternative — the hormonal/regulatory hypothesis — which suggests “obesity is a disorder of excess fat accumulation.” Scientists and physicians have construed obesity as a psychological disorder since the 1930s, when L. H. Newburgh claimed it is caused by “various human weaknesses such as overindulgence or ignorance.” The hormonal/regulatory hypothesis, on the other hand, suggests overeating and sedentary behavior are compensatory effects, not causes of obesity.\n\nIn his survey of the history of obesity research, Taubes locates two leading proponents of the hormonal/regulatory hypothesis whose work dates back to pre-war Germany and Austria: Gustav von Bergmann and Julius Bauer. Taubes argues the hypothesis Bergmann and Bauer developed fell out of favor after the Second World War, when Bauer fled Austria, the lingua franca of the medical literature shifted, and people no longer read studies in German.\n\nThe hormonal/regulatory hypothesis all but disappeared until 1965, when a group of researchers including Rosalyn Yalow and Solomon Berson discovered a method for measuring fatty acids in the blood, thus uncovering a way to study fat metabolism. They discover insulin is the primary regulator. Since then, several scientists have gone against the consensus of their peers and called for new research on the dysregulation of insulin signaling and fat metabolism. Taubes lists a few notable examples and describes the backlash such research often encounters.\n\nDr. Robert Atkins provides a telling example. Atkins’ research included support for the hormonal/regulatory hypothesis by demonstrating the positive metabolic effects of a low-carbohydrate diet, but physicians and other members of the scientific community who feared fat more than carbohydrates worked to make Atkins' name synonymous with quackery. “And in order to get rid of Atkins, you had to get rid of the science behind Atkins,” Taubes explains. “So Atkins was the bath water, the endocrinology was the baby, and by the 1980s, there was no discussion anymore of the hormonal, endocrinological regulation of fat metabolism in obesity textbooks or obesity papers, because if you discuss that, you are led de facto to a low-carbohydrate diet.”\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 0,
        resourceId: {
          kind: "youtube#video",
          videoId: "qQu-9RFFQkk",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/JZd6XzgKx5v-DL1L6WcNPdLrI4E"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC4yODlGNEE0NkRGMEEzMEQy",
      snippet: {
        publishedAt: "2019-11-19T22:37:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "David Diamond on Deception in Cholesterol Research: Separating Truth From Profitable Fiction",
        description:
          "“I want to show you how we are deceived,” Dr. David Diamond told the audience at the 2019 CrossFit Health Conference.\n\nDiamond, who has a Ph.D. in biology and 40 years of experience as a neuroscientist, spoke on a topic that drew his interest later in his career: cholesterol science and the various forms of deception apparent in research on cholesterol-lowering statins.\n\nDiamond developed an interest in cholesterol and statins in 1999 after being diagnosed with familial hypertriglyceridemia, a genetic anomaly that causes triglyceride levels in the blood to become elevated and leads to additional health complications such as obesity. After following the dietary recommendations — reducing his saturated fat and meat consumption while consuming greater quantities of carbohydrates such as oatmeal and beans — Diamond had succeeded only in raising his triglycerides, lowering HDL cholesterol, and gaining weight. His doctor recommended that he begin taking statins.\n\nDiamond recalled the moment when he said, “‘Well, I’ve got a Ph.D. in biology. The least I can do is read about what is a triglyceride and what I should do about it.’” After delving into the medical research, he realized, “Damn! It’s the bread, and the potatoes, and the sugar I’ve been eating. I’ve been so happy eating bread without butter, and … it’s the bread that’s driving up my triglycerides.” He continued, “I was struck by this epiphany that I’d been given the wrong information.”\n\nAfter his epiphany, Diamond began investigating how his doctor and the dietary guidelines could have gotten the science on cholesterol so wrong. He traced the misinformation to Ancel Keys, who became famous in 1961 for developing the cholesterol hypothesis. Keys’ hypothesis suggested the consumption of saturated fat leads to increased cholesterol that clogs arteries and leads to heart disease. Despite a preponderance of evidence to the contrary, Keys’ hypothesis became influential, and Keys, a man Diamond notes had “a bachelors in economics” and “knew nothing about nutrition, knew nothing about heart disease … was in charge, to a great extent, of nutrition and heart disease research in America.”\n\nDiamond continued to review cholesterol science and statin research, and his first epiphany was followed by many more. For instance, contrary to received dogma, “People with high cholesterol have a significantly lower rate of cancer, infectious disease, and live [an] overall normal lifespan,” he explained.\n\nDuring his talk, Diamond also explained the methods of statistical manipulation researchers and drug companies use to inflate statins’ effectiveness for lowering heart disease risk while downplaying the drugs’ adverse effects. He demonstrated, for instance, that the authors of the trial for cholestyramine were able to make a statistically insignificant .4% improvement in heart disease risk look like 24% by reporting relative rather than absolute risk. He looked at the study on Lipitor, which helped generate $100 billion in revenue for the company and found the same thing: The study claimed the drug could decrease heart disease risk by 36%, a gross manipulation of the 1% absolute risk that actually matters.\n\nDiamond also argued the adverse effects of statins are manifold and significant. The peer-reviewed medical literature, he explained, has demonstrated an association between statins and Type 2 diabetes, rhabdomyolysis, cognitive disorders, cataracts, renal failure, and liver dysfunction, to name a few. Nevertheless, statins remain the most widely prescribed class of drugs in the United States. To explain why this is true, Diamond cited a quote from his colleague Paul Rosch, published in the Scandinavian Cardiovascular Journal: “That belief that coronary atherosclerosis is due to high cholesterol has been perpetuated by powerful forces using tactics to preserve the profits and reputations of those who promote the doctrine.”\n\nDiamond concluded, “The only person that potentially can benefit from a statin is someone that really wants to depend more on medication than a lifestyle change.”\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/inwfSkSGvQw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/inwfSkSGvQw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/inwfSkSGvQw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/inwfSkSGvQw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/inwfSkSGvQw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 1,
        resourceId: {
          kind: "youtube#video",
          videoId: "inwfSkSGvQw",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/-jD2jSRnrmLn4w9enDQJPXZfSOY"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC4wMTcyMDhGQUE4NTIzM0Y5",
      snippet: {
        publishedAt: "2019-11-19T22:37:46.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Dr. Jason Fung: Financial Conflicts of Interests and the End of Evidence-Based Medicine",
        description:
          "“Evidence-based medicine is actually so corrupt as to be useless or harmful,” Marcia Angell wrote in 2009. The statement was less a revelation than something many already knew, but it made waves because of its source. Angell, a medical insider, had spent two decades as the editor-in-chief of the New England Journal of Medicine.\n\nDr. Jason Fung is also a medical insider who has become wary of scientific research that purports to be “evidence based.” A well-known nephrologist and author, Fung often speaks about Type-2 diabetes reversal and the metabolic effects of intermittent fasting, but in this presentation from Dec. 15, 2018, he turns his focus toward the many ways the foundations of evidence-based medicine have become corrupted by financial conflicts of interest.\n\nThe first conflicts of interest he highlights pertain to the corruption of doctors. Practicing physicians who accept gifts from Big Pharma are 225-335% more likely to prescribe drugs from the gift-giving company than those who do not, Fung explains.\n\nThe corruption of doctors in prestigious universities is even worse, he claims. “There's a clear correlation: The more prestigious a doctor, the more money they're getting from the pharmaceutical.” Anecdotally, he says, this means you may be better off seeking medical advice from a family physician than from a Harvard professor; the former probably just accepted a $10 pen from Big Pharma while the latter is on the take for $500,000. “It just is a terrible system,” he says. “Yet, these people are the people that are in the newspaper. They're the ones that are teaching medical students, are the ones who are teaching the — the dietitians, the pharmacist — everybody.”\n\nThe most insidious corruption affects the published research on particular drugs. Fung highlights the influence industry can have when it finds a medical journal editor willing to take its money. Another problem arises in the form of industry-funded medical research. This conflict of interest leads to the selective publication of positive trials, which can skew the science on particular drugs and lead to unnecessary or even dangerous overprescription. Fung notes how statin prescriptions illustrate the scope of this particular problem.\n\n“We accept this of drug companies … but the problem is that people die,” Fung says. He later adds: “You can make arguments that sugar is a health food, that opioids are good for you … but it harms patients, and we always have to remember that at the end of the day, this is not why we became doctors. The reason we became doctors was to help people, but we're not until we kind of set those same rules as everybody else.”\n\nTo read a full transcription of the presentation, click here.\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)\nThe CrossFit Journal -- (https://journal.crossfit.com)\nThe CrossFit Games -- (https://games.crossfit.com)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/z6IO2DZjOkY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/z6IO2DZjOkY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/z6IO2DZjOkY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/z6IO2DZjOkY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/z6IO2DZjOkY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 2,
        resourceId: {
          kind: "youtube#video",
          videoId: "z6IO2DZjOkY",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/ftPZAaqj4f1FBdDAyPj_jlmBkeU"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC41MjE1MkI0OTQ2QzJGNzNG",
      snippet: {
        publishedAt: "2019-11-19T22:37:51.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Dr. Thomas Seyfried: Cancer as a Mitochondrial Metabolic Disease",
        description:
          "Thomas Seyfried, Ph.D., is a biochemical geneticist, professor of biology at Boston College, and author of the groundbreaking book Cancer as a Metabolic Disease. As part of a lecture delivered on July 31, 2018, at the annual CrossFit Health Conference, Seyfried presented a report card on our current approaches to treating cancer in the United States. Looking at data from the American Cancer Society on cancer incidence and deaths per day between 2013 and 2017, he noted death rates are actually on the rise. “The more money we raise for cancer, the more cancer we get,” he observed. “So you have to ask, ‘What is going on here?’ ... This is a failure of monumental proportions.”\n\nThe reason for the failure “has to do with a fundamental misunderstanding of what the nature of this disease is,” he explained. “We’ve been led to believe that this is a genetic disease, and I’ll present evidence to say that it’s not.”\n\nThe belief that cancer is a genetic disease associated with somatic mutation has become dogma, Seyfried explained, and this dogma shaped much of the cancer research and treatment protocols of the twentieth century. So-called cutting-edge treatments, such as personalized therapy and precision medicine, are based on this viewpoint.\n\nUnfortunately, the viewpoint is wrong, as Seyfried explained in “Cancer as a Mitochondrial Metabolic Disease,” an article published in Frontiers in 2015. There, he aggregated existing research on cancer and reevaluated the information in light of the two competing theories on the origin of the disease (i.e., cancer as a genetic or metabolic disease).\n\nThe research he surveyed supported Otto Warburg’s theory that cancer develops as a result of disturbed energy metabolism. Seyfried and his colleagues compared nuclear-cytoplasmic transfer and mitochondrial transfer experiments and found that the mitochondria are “calling the shots, not the nucleus,” which is “the opposite of what we would expect if this were a genetic disease,” he explained.\n\nSeyfried then described what he and his colleagues believe is the missing link in Warburg’s theory. Normal healthy cells derive energy from oxidative phosphorylation. Cancer cells, on the other hand, get energy through fermentation. What Seyfried and his colleagues discovered — and what Warburg did not know — is that cancer cells can ferment not only lactic acid but amino acids as well. That is to say, cancer cells can derive energy for proliferation from glucose and glutamine. Thus, to remove a cancer cell’s energy source, one has to remove its access to fermentable fuels, and an effective way to do this, Seyfried found, is through calorie restriction and ketosis.\n\nCalorie restriction and ketosis, he explained, are anti-angiogenic, anti-inflammatory, and pro-apoptotic. “No cancer drug is known that can do this without toxicity,” he said. He then added that those who claim they don’t understand the mechanism by which calorie restriction and ketosis work are full of “bullshit.” “They don’t read the literature. Nor do they contribute to it,” he said.\n\nSeyfried’s cancer research, particularly on aggressive forms of cancer such as glioblastoma multiforme (GBM) and other stage 4 cancers, led to his development of a glucose-ketone index calculator and the press-pulse therapeutic strategy. The calculator helps patients monitor their progress toward therapeutic ketosis. The press-pulse method pairs press therapies, such as following a keto diet while taking ketone supplements and practicing stress management, with pulse therapies, such as taking glucose and glutamine inhibitors while undergoing hyperbaric oxygen treatments. During his presentation, Seyfried explained how and why these methods are more effective for cancer patients than traditional standard of care.\n\n“GBM and other stage 4 cancers — I don’t consider them as terminal cancers,” he said.\n\nTo read a full transcription of the presentation, click here.\n\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/KusaU2taxow/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/KusaU2taxow/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/KusaU2taxow/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/KusaU2taxow/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/KusaU2taxow/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 3,
        resourceId: {
          kind: "youtube#video",
          videoId: "KusaU2taxow",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/TztqrrMmgGJW3OK7oh81ylzyDc8"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC4wOTA3OTZBNzVEMTUzOTMy",
      snippet: {
        publishedAt: "2019-11-19T22:37:56.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Dr. Zoë Harcombe on the Mess: The Money vs. the Evidence",
        description:
          "Zoë Harcombe, Ph.D., is an independent author, researcher, and speaker in the fields of diet, health, and nutrition. Over the years, research for her books and speaking engagements has made her an expert in the corruption and error plaguing the health sciences — a dire situation that she, like CrossFit Founder Greg Glassman, refers to as “The Mess.”\n\nHarcombe defines “The Mess” as “the escalating disease (and) the escalating medical costs, which many people are profiting from but none are combatting effectively.” During a presentation delivered on July 31 at the 2019 CrossFit Health Conference, Harcombe outlined many factors that contribute to this growing problem — specifically, the role of dietitians and the food and beverage industry in influencing how and what we eat, accreditation that regulates who can offer dietary advice, and the disparity between what we are told to eat and what the evidence suggests we should eat.\n\nEarly in her talk, Harcombe shares her research on the dubious back-door maneuvers multibillion-dollar food companies use to promote their products, including paying for studies that tout their products’ health benefits and adding public health advisors to the payroll. She observes that the only thing that would make their marketing efforts easier would be if these paid advisors had a monopoly on doling out dietary advice — which is precisely what they have sought to do in many states in the U.S. by joining forces with the Commission on Dietetic Registration (CDR) and the Academy for Nutrition and Dietetics (AND).\n\nHarcombe shares the story of Steve Cooksey to offer one telling example of how these organizations and others like them try to maintain a monopoly over nutrition advice. Cooksey was diagnosed with Type 2 diabetes, but rather than following the medical advice he received to eat a low-fat, high-carb diet, he ate the opposite way and lost 70 lb. He started a blog, sharing his story and offering free advice to others, and was promptly rebuked by the North Carolina Board of Dietetics and Nutrition, which claimed he was “practicing without a license.” CrossFit and the Institute of Justice helped Cooksey with his case, developing a defense based upon the First Amendment’s protection of freedom of speech. Cooksey won.\n\nNevertheless, industry-backed organizations continue to pursue sole rights to offering nutrition advice — advice that proves convenient for the companies that support the organizations financially. To demonstrate how problematic this system is, Harcombe compares the AND’s food recommendations to scientific research on nutrition.\n\nApart from the AND’s tendency to confuse macronutrients with food groups, Harcombe also points to its support of the overconsumption of carbohydrates. Citing a 2005 government panel on macronutrients, Harcombe notes, “The lower limit of dietary carbohydrate compatible with life apparently is zero, provided that adequate amounts of protein and fat are consumed.” “There is no essential carbohydrate,” she explains. “There are essential proteins, and there are essential fats.”\n\nHarcombe discusses how to evaluate the credibility of a scientific paper then brings this to bear on the nutrition recommendations promoted by the Evidence for Dietary Guidelines for Americans (DGA) and the AND. She finds their evidence entirely inadequate.\n\nNutrition advice provided by the AND, DGA, and CDR “is not evidence-informed, let alone evidence-based,” she argues. These credentialing organizations “need to be countered with an equal and opposite force.”\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/UzX1QTSSw88/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/UzX1QTSSw88/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/UzX1QTSSw88/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/UzX1QTSSw88/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/UzX1QTSSw88/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 4,
        resourceId: {
          kind: "youtube#video",
          videoId: "UzX1QTSSw88",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/v5X8AbCp56xzh1uiZVxMx4dnzTw"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC4xMkVGQjNCMUM1N0RFNEUx",
      snippet: {
        publishedAt: "2019-11-19T22:38:05.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Dr. Maryanne Demasi: My Experience of Exposing the Statin Controversy",
        description:
          'Dr. Maryanne Demasi earned a Ph.D. in rheumatology from the University of Adelaide, but perhaps the most formative experience she had with the medical sciences occurred while she was an investigative journalist with the Australian Broadcasting Corporation (ABC). During her tenure with the ABC, she produced a two-part series called “Heart of the Matter,” which challenged the role of cholesterol in heart disease and addressed the overprescription of statin drugs. The fallout from the series was not swift, but it was decisive. In this presentation, delivered on June 8, 2019, at a CrossFit Health event at CrossFit Headquarters, Demasi shares her personal experiences and the challenges she faced while trying to relay the limitations of statin data to the public.\n\nDemasi recalls how, while performing research for her projects as a medical reporter, she would often do a deep dive into the science and … would come out with very disappointing conclusions.” “Over my career,” she explains, “I started to become a little dismayed with the quality of the science.” She describes uncovering methodological problems and argues that such problems contribute to the replication crisis, produce conflicting health recommendations, and lead to dwindling trust in medical professionals.\n\nDemasi has devoted a considerable amount of time to researching and relaying the corruption inherent in what she terms the "Statin Wars." By way of offering background on the “acrimonious debate … about statins,” she explains, “I think a lot of the problems started in the mid-80s when former U.S. President Ronald Reagan decided to significantly slash funding to the National Institutes of Health.” This shift, she claims, “allowed private industry to move in and start funding their own clinical trials.”\n\nThe problem with industry’s infiltration of the health sciences, she explains, became abundantly clear as she researched the "Statin Wars." She notes the drug companies began to design their own clinical trials without oversight by unbiased parties. In addition, she explains, “we started to discover through legal suits that pharmaceutical companies were hiring marketing firms or getting marketing people to do the first drafts of their manuscripts that they would submit for peer review in order to give a positive spin on the trial data." She notes that although such practices “might not sound ethical, it’s a perfectly legal thing to be doing.”\n\nIn the documentary series “Heart of the Matter,” she and her colleagues shared these findings and highlighted that the benefits of statins had been exaggerated while their side effects had been downplayed. Despite receiving accolades for hard-hitting reporting and carefully executed research, Demasi and her colleagues eventually started receiving backlash, first from the Australian Heart Foundation and then from the Cholesterol Treatment Trialists Collaboration (CTT). By December 2016, Demasi, along with the colleagues who worked on the series with her, was out of a job.\n\nReflecting on the experience, Demasi says, “I\'m okay about this, and I wear it as a badge of honor. I think I did my job as a journalist.”\n\n“I ask the questions without fear or favor,” she adds.\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/t2dHQSj90-A/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/t2dHQSj90-A/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/t2dHQSj90-A/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/t2dHQSj90-A/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/t2dHQSj90-A/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 5,
        resourceId: {
          kind: "youtube#video",
          videoId: "t2dHQSj90-A",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/CrZZ7OEYzhr3uoLZY7MPlNFT6fA"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC41MzJCQjBCNDIyRkJDN0VD",
      snippet: {
        publishedAt: "2019-11-27T19:31:16.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Dr. Michael Eades: Paleopathology and the Origins of the Paleo Diet",
        description:
          "“Blood-vessel disease was common (among the ancient Egyptians), contrary to assumptions that it arises from urban stress and a modern high-fat diet,” Dr. Michael Eades, MD, reads aloud to the audience at the CrossFit Health Conference on Aug. 1, 2018. Eades is a well-known physician and author of several books about the science behind low-carb diets, but this quote from Arno Karlen’s book Napoleon’s Glands brought to mind knowledge from a previous career path, when he was a college student interested in Egyptology.\n\nEades had researched the dynastic Egyptians’ lifestyle and knew they had eaten a wheat-based diet. The statement he read in Karlen’s book, he says, “electrified” him. He recalls waiting in anticipation for the library to open the next morning so he could perform additional research on the ancient Egyptian diet and its potential relation to cardiovascular disease (CVD). In this presentation, Eades shares some of the outcomes of that research, taking his audience “on a journey through the anthropological literature and what that means in terms of ‘off the carbs.’”\n\n“So if you look at all the data out there,” Eades concludes, “you look at the metabolic constraints, the Kleiber line, the expensive tissue hypothesis, you look at the stable isotope data, you look at the hunter-versus-farmer data, you look at the ancient Egyptian data, you look at the modern RCTs, and it’s pretty clear that ‘off the carbs’ is the way to be.”\n\nMore at https://www.crossfit.com/essentials/eades-health-conference-paleopahology",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/3fewDdSUSwg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/3fewDdSUSwg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/3fewDdSUSwg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/3fewDdSUSwg/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/3fewDdSUSwg/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 6,
        resourceId: {
          kind: "youtube#video",
          videoId: "3fewDdSUSwg",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/FAm2PCH5H0lPzweNyjVVoO9R_6Q"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC5DQUNERDQ2NkIzRUQxNTY1",
      snippet: {
        publishedAt: "2019-12-06T18:39:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Dr. Jim McCarter: Debunking Common Keto Myths",
        description:
          "“There’s really only one goal for this talk, and that’s to arm you to answer any question about ketogenic and low-carb nutrition approaches,” Jim McCarter said during a presentation at a CrossFit Health event on Oct. 13, 2019.\n\nMcCarter, MD and Ph.D., is an expert on the ketogenic diet, particularly its effectiveness for treating and reversing Type 2 diabetes (T2D). His personal journey with ketosis began in 2012 after he began researching the health-related effects of corn syrup and sugar. His research led him to Gary Taubes’ book, The Case Against Sugar, and the discovery of several misconceptions he had carried, “dating back to medical school.”\n\nDuring his talk, McCarter focuses on correcting some of these misconceptions about nutrition and metabolic health, particularly misconceptions about nutritional ketosis. He notes several benefits of ketosis, explaining ketones provide an alternative form of energy to glucose in individuals with insulin resistance (ketones provide about 60% of the brain’s energy during fasting). Ketosis also lowers insulin levels, which improves insulin sensitivity, and ketones provide a signal for the body to reduce oxidative stress and inflammation.\n\nMcCarter then highlights the various ways clinical research has debunked 40 common myths about the ketogenic diet. As the former Head of Research for Virta, a nationwide telemedicine provider and full-stack technology company that focuses on the reversal of T2D, much of the data he uses come from the Virta-Indiana University Health (Virta-IUH) clinical trial.\n\nOne of the prevailing myths about the diet is that it is unsustainable. McCarter claims this is false, observing that of the 465 participants in the Virta-IUH trial, 74% were able to maintain participation, even with extensive tracking demands. Most agreed to extend their participation to five years, he adds.\n\nFor those interested in beginning the ketogenic diet, or those who are following the diet and would like to be equipped with data to defend the choice, McCarter explains where to go to find information debunking each of the following myths:\n\nKeto is unsustainable.\nKeto will cause diabetic ketoacidosis.\nKeto will cause hypoglycemia.\nKeto will deprive the brain of required glucose.\nKeto will impair the heart and cause vascular damage.\nKeto will worsen the blood lipid profile.\nKeto will cause inflammation.\nKeto will cause hypothyroidism.\nKeto will harm the liver and increase liver fat.\nKeto will harm the kidneys.\nKeto will cause muscle loss.\nKeto will cause loss of bone mineral density.\nKeto is just a fad.\nKeto is not the standard of care.\nKeto benefits are limited to weight loss.\nKeto weight loss is just water.\nKeto will cause “keto flu.”\nKeto will cause constipation.\nKeto will require too much sodium.\nKeto sodium will cause hypertension.\nKeto will cause adrenal fatigue.\nKeto will cause gallstones and requires a gallbladder.\nKeto increases mortality in nutritional epidemiology studies.\nKeto requires meat consumption.\nKeto will increase cancer risk.\nKeto increases circulating saturated fat.\nKeto provides inadequate dietary fiber.\nKeto interferes with the gut microbiome.\nKeto is environmentally unsustainable.\nKeto foods are too expensive.\nKeto will interfere with exercise.\nKeto will deplete muscle glycogen.\nKeto will raise long-term risk of gout.\nKeto will increase long-term risk of kidney stones.\nKeto will cause “keto crotch.”\nKeto will cause “keto bloat.”\nKeto will confuse the public.\nKeto will undermine science.\nKeto will cause diabetes.\nIt’s better just to stay with usual care for diabetes management.\n\nAfter explaining how clinical studies have debunked each of these myths, McCarter concludes his talk by addressing the doctors in the audience: “Be informed. Talk with your patients. Debunk myths meant to cause fear … . Let patients know they have a choice to reverse diabetes.”\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/GJZaEYkfCHs/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/GJZaEYkfCHs/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/GJZaEYkfCHs/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/GJZaEYkfCHs/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/GJZaEYkfCHs/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 7,
        resourceId: {
          kind: "youtube#video",
          videoId: "GJZaEYkfCHs",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/o1_szSbCXXCaD1gZEEHWWSpGbEs"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC45NDk1REZENzhEMzU5MDQz",
      snippet: {
        publishedAt: "2020-01-09T21:56:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Vladimir Subbotin: An Alternative Hypothesis for Coronary Atherosclerosis",
        description:
          "In 1987, the American Heart Association claimed cholesterol-lowering statin drugs would \n\n“almost eliminate the necessity for bypass surgery and percutaneous coronary intervention (PCI), and eradicate CA (coronary atherosclerosis) by the end of the 20th century.” Unfortunately, as Vladimir Subbotin, an MD and Ph.D. with expertise in disease pathology, explains, “the prognosis stopped short of satisfying the predictions.” In this presentation, delivered at a CrossFit Health event on Dec. 15, 2019, Subbotin shares his explanation for why statins have failed to meet the AHA’s expectations. That failure, he claims, is due to a fundamentally flawed understanding of the pathogenesis of the disease. He presents an alternative hypothesis. \n\n\n\nCrossFit (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/vLpDCetBIC0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/vLpDCetBIC0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/vLpDCetBIC0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/vLpDCetBIC0/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/vLpDCetBIC0/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 8,
        resourceId: {
          kind: "youtube#video",
          videoId: "vLpDCetBIC0",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/PkMAaY_w2DqpRBdi1FB-Ygh809o"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC5GNjNDRDREMDQxOThCMDQ2",
      snippet: {
        publishedAt: "2020-01-18T00:04:16.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Aseem Malhotra: Lessons in Public Health Advocacy",
        description:
          "Dr. Aseem Malhotra is a best-selling author, researcher, and one of the most well-known cardiologists in the U.K. His views on cholesterol and sugar, controversial primarily among those who choose to promote special interests at the expense of public health, have landed him in numerous front-page news articles and on primetime television shows. Here, Malhotra discusses his experiences moving from clinical practice into the public eye and shares the lessons he has learned about public health advocacy along the way. \n\nTo read a complete transcription of the presentation, click here (https://s3.amazonaws.com/crossfitpubliccontent/AseemMalhotra_DDC.pdf)\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/iEldErpvNCk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/iEldErpvNCk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/iEldErpvNCk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/iEldErpvNCk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/iEldErpvNCk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 9,
        resourceId: {
          kind: "youtube#video",
          videoId: "iEldErpvNCk",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/lFDJdraN7g7_RMOq49a-wONIVdY"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC5EMEEwRUY5M0RDRTU3NDJC",
      snippet: {
        publishedAt: "2020-02-18T00:31:52.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Georgia Ede: Brainwashed — The Mainstreaming of Nutritional Mythology",
        description:
          "Georgia Ede, MD, is a nutritional psychiatrist who is “passionate about the care — the proper care and feeding of the human brain,” she tells the audience at a CrossFit Health event on Dec. 15, 2019. During her presentation, Ede delineates the various ways authoritative bodies such as the USDA and World Health Organization, through their spread of unscientific dietary guidelines that are rife with misinformation, have complicated her efforts to help patients eat healthfully.\n\n\nCrossFit® - Forging Elite Fitness® (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WbNDrcoRi8g/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WbNDrcoRi8g/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WbNDrcoRi8g/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WbNDrcoRi8g/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WbNDrcoRi8g/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 10,
        resourceId: {
          kind: "youtube#video",
          videoId: "WbNDrcoRi8g",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/S4t6lfjxjOaPNajmRLR6nVdh4r0"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC45ODRDNTg0QjA4NkFBNkQy",
      snippet: {
        publishedAt: "2020-03-13T16:57:33.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Dr. Priyanka Wali: Insulin Resistance and Sexual Health",
        description:
          "“It is a basic human right for everyone to have a satisfying sexual life, and it is our duty as physicians to help foster this with our patients,” Dr. Priyanka Wali, MD, tells the audience at a CrossFit Health event on Dec. 15, 2019. In this presentation, Wali — who divides her time between clinical practice, various other medical advisory roles, and stand-up comedy — focuses on the relationship between metabolic and sexual health.\n\nWali’s primary argument is: “Any person presenting with any signs of sexual dysfunction should consider screening for insulin resistance.”\n\nWhile she acknowledges there are few rigorous randomized controlled studies on this topic, she insists sexual dysfunction is a potential indicator of an underlying metabolic issue.\n\n“Sexual dysfunction, by definition, is any disturbance in sexual desire and in the psycho-physiologic changes associated with the sexual-response cycle in men and women,” Wali explains. Moreover, the condition is “quite prevalent,” she says. As many as “40 to 50% of women have sexual dysfunction, irrespective of age.\"\n\nWali bends a critical eye toward the industries that have been built up around sexual dysfunction. “The pharmaceutical male sexual enhancement industry is a multimillion dollar industry,” she observes. “Men are sold this idea that you can just take a pill and you can improve the odds of having an erection, but I'm here to tell you, yes the odds are good, but the goods are still odd, because erectile dysfunction is a sign of cardiovascular disease (CVD).”\n\nThe relationship between erectile dysfunction (ED) and CVD has been extensively studied and is well known. What is not as well known but is equally important, Wali claims, is that ED is also a sign of metabolic disorder.\n\nA 2015 study analyzed the association of ED with undiagnosed diabetes, hypertension, and hypercholesterolemia. The study found, “Erectile dysfunction was strongly associated with undiagnosed diabetes in both the adjusted and unadjusted analyses.”\n\nWali also notes that a study of 800 men in Italy found “there was a progressive decline in penile blood flow velocity both at baseline and at peak blood flow as the number of metabolic syndrome components increased.”\n\nThese studies indicate doctors need to reexamine how they react to cases of sexual dysfunction among their male patients, Wali suggests. “Right now, drugs like Cialis, Viagra, they're all getting prescribed a lot,” she says. “But I think before providing anyone with a prescription for these medications, if someone is complaining — if a man is complaining of erectile dysfunction, they must absolutely be screened for diabetes and other secondary causes of insulin resistance before being prescribed vasodilatory medications.”\n\nSimilar claims can be made regarding the treatment of sexual dysfunction among women. Studies have found “clitoral vascular resistance, or essentially impaired blood flow to the clitoris, is positively associated with metabolic syndrome and insulin resistance, and it leads to decreases in sexual arousal. It also leads to psychological issues like body image concerns,” Wali explains. “So just like in men, women should also be screened for endocrine disorders when complaining of sexual dysfunction.”\n\nWali concludes: “I think it's really important to understand that patients with metabolic syndrome are suffering from significant sexual distress, and it's our duties as physicians to address this.”\n\nCrossFit® - (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/cXTAf3PEdkk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/cXTAf3PEdkk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/cXTAf3PEdkk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/cXTAf3PEdkk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/cXTAf3PEdkk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 11,
        resourceId: {
          kind: "youtube#video",
          videoId: "cXTAf3PEdkk",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Et8FnpMyet03VyRMUFrtys7T9vw"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC4zMDg5MkQ5MEVDMEM1NTg2",
      snippet: {
        publishedAt: "2020-03-20T00:22:41.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title:
          "Zoë Harcombe on The Game Changers: Good Story, Unconvincing Argument",
        description:
          "Zoë Harcombe, Ph.D., concedes The Game Changers tells “a good story,” but that’s as far as the 2019 documentary’s accolades should go, she suggests. In this presentation from Dec. 15, 2019, Harcombe offers an incisive and often humorous critique of the arguments the film makes in favor of a plant-based diet.\n\nThe Game Changers bases its support of plant-based eating on three common arguments, Harcombe explains:\n\n1. It’s healthier than non-vegan diets.\n2. It’s better for the animals.\n3. It’s better for the planet.\n\nSince the majority of the film is devoted to the nutrition argument, Harcombe focuses her attention there as well.\n\nAfter noting that, despite the movie’s claims, there is a dearth of scientific evidence for going plant-based, Harcombe turns with wry humor to the film’s burrito experiments. The science in these and the movie’s other experiments is deeply flawed, she claims.\n\nOne experiment, which follows the Tennessee Titans as they turn to vegan eating, “is a great example that the standard American diet is rubbish,” Harcombe says. She argues any apparent benefits experienced by the athletes were probably attributable to their trading of junk food for whole foods. “Now the whole food just happens to be plant-based,” she notes, but “how good could they have been if their whole food diet had been animal-based?” she asks.\n\nFinally, Harcombe argues the film tries to gloss over the nutritional deficiencies in a vegan diet by suggesting everyone should take supplements, not only those who have gone plant-based. But those who follow a healthy diet of whole foods that include animal products do not need supplements, she claims: “A healthy diet provides the nutrients that we need. A healthy diet does not require supplements. A vegan diet requires supplements. De facto, a vegan diet is not healthy.” \n\nTo read a complete transcript of the presentation, click here (https://s3.amazonaws.com/crossfitpubliccontent/Zoe-Harcombe-Game-Changers2.pdf).\n\nCrossFit® - (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/9tx7oTyTL6Q/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/9tx7oTyTL6Q/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/9tx7oTyTL6Q/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/9tx7oTyTL6Q/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/9tx7oTyTL6Q/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 12,
        resourceId: {
          kind: "youtube#video",
          videoId: "9tx7oTyTL6Q",
        },
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/kKD-MvXYn_cmRTegtPtatBic1gs"',
      id:
        "UExkV3ZGQ09BdnlyMXBiemktUlJTZUJNNUFKaWRtZzJ1NC41Mzk2QTAxMTkzNDk4MDhF",
      snippet: {
        publishedAt: "2020-03-27T18:33:53.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "The Five Buckets of Death SCREENER",
        description:
          "In a version of a talk he has delivered during grand rounds at medical schools around the country, CrossFit Founder Greg Glassman groups various common causes of death into one of five categories: chronic, microbic, genetic, kinetic, or toxic.\n\nThe chronic disease bucket includes conditions such as obesity, heart disease, diabetes, stroke, hypertension, and kidney disease. Microbic deaths are caused by things like ebola, malaria, and SARS-COV-2, the virus behind the COVID-19 outbreak. The genetic bucket includes conditions such as Tay-Sachs and cystic fibrosis, kinetic examples include car crashes and falls, and the toxic bucket includes deaths caused by nerve agents, snake bites, and botulism, for example.\n\nPointing to the chronic diseases, Glassman notes, “This is about 86% of our medical spend on our runaway medical expenditure. It’s 86% of spend, 80% of deaths.” The other four categories receive 14% of spend and represent 20% of deaths.\n\n“The significant thing here for us as CrossFitters is that we have a solution to this side,” Glassman says, again pointing to the chronic diseases. “And the solution here is what? It’s get off the couch, get off the carbs.”\n\nGlassman insists sedentarism and excessive consumption of refined carbohydrates are not related to lifestyle. Instead, he says, they are “two pathological behaviors, two deleterious, extremely damaging behaviors that were choices.”\n\n“The solution here — it’s behaviorally driven and it will be behaviorally cured or it will be medically babysat.”\n\nTurning his attention to the COVID-19 crisis, Glassman explains, “What has happened is that the SARS-COVID-2 virus, which is the agent — the virus responsible for COVID-19, the illness, has escaped the microbic bucket and landed in the chronic disease bucket and has essentially started a trashcan fire with a precipitation of death, to mix metaphors.”\n\nGlassman attributes the potency of the illness to comorbidities, the simultaneous presence of one or more chronic diseases in the patients affected. “I see these as chronic disease deaths,” he says.\n\n“CrossFit fixes this. Medicine babysits it.”\n\n\nCrossFit® - (https://www.crossfit.com/)",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_b8MPzW2QDI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/_b8MPzW2QDI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/_b8MPzW2QDI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/_b8MPzW2QDI/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/_b8MPzW2QDI/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        playlistId: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
        position: 13,
        resourceId: {
          kind: "youtube#video",
          videoId: "_b8MPzW2QDI",
        },
      },
    },
  ],
};

const crossfitHqPlaylistsFirstPage: YoutubeResponse<PlaylistInfo> = {
  kind: "youtube#playlistListResponse",
  etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/AhxfHK-dHDtQef8jrz2mdlxbXRM"',
  nextPageToken: "CDIQAA",
  pageInfo: {
    totalResults: 288,
    resultsPerPage: 50,
  },
  items: [
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Wg56Kitu5ITkOTb1DHiUqIoNG4k"',
      id: "PLdWvFCOAvyr1pbzi-RRSeBM5AJidmg2u4",
      snippet: {
        publishedAt: "2019-11-14T21:48:13.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Messpert Lectures",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/qQu-9RFFQkk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Messpert Lectures",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/-CY5f5YkLF6cDVuYhSG8NnGklro"',
      id: "PLdWvFCOAvyr0q99QIkLBq4tfYhTVbsBIs",
      snippet: {
        publishedAt: "2019-03-11T17:08:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "9 Foundational Movements - English",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/rMvwVtlqjTE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/rMvwVtlqjTE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/rMvwVtlqjTE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/rMvwVtlqjTE/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/rMvwVtlqjTE/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "9 Foundational Movements - English",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/HNmKBnAvb4AOLrRuo5y33f9BW1Q"',
      id: "PLdWvFCOAvyr17pASg7kq8mgrn1UVR5hG9",
      snippet: {
        publishedAt: "2019-01-09T18:16:19.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "CrossFit Battles",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/mdYVFxvAP4o/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/mdYVFxvAP4o/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/mdYVFxvAP4o/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/mdYVFxvAP4o/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/mdYVFxvAP4o/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "CrossFit Battles",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Zl5qsRbymwDEUpZ22tWabh_INxI"',
      id: "PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4",
      snippet: {
        publishedAt: "2019-01-09T18:15:17.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "CrossFit Essentials",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1ZXobu7JvvE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1ZXobu7JvvE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1ZXobu7JvvE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/1ZXobu7JvvE/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/1ZXobu7JvvE/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "CrossFit Essentials",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/UoLTW94I3HxO-tkUcMc82jTsDKY"',
      id: "PLdWvFCOAvyr2je51OXZODVtlYARi0P-D4",
      snippet: {
        publishedAt: "2019-01-09T18:14:17.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "CrossFit at Home",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/u4lvmtFqgio/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/u4lvmtFqgio/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/u4lvmtFqgio/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/u4lvmtFqgio/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/u4lvmtFqgio/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "CrossFit at Home",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/dqLcPDhzc8tfvBiQAoL9G3Ok9Eg"',
      id: "PLdWvFCOAvyr3N7fudujVAVp12TyRUNBp1",
      snippet: {
        publishedAt: "2019-01-09T18:12:49.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Cooking",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Pk_C9FNs7RU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Pk_C9FNs7RU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Pk_C9FNs7RU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/Pk_C9FNs7RU/sddefault.jpg",
            width: 640,
            height: 480,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Cooking",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/bbtdW85_U8fOQQbzziNe1Js0oyU"',
      id: "PLdWvFCOAvyr3ThYGExs8KnJt5APd0b1Wk",
      snippet: {
        publishedAt: "2018-12-23T17:57:28.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Killing The Fat Man: Season 2",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/IQMOFo-b09s/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/IQMOFo-b09s/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/IQMOFo-b09s/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/IQMOFo-b09s/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/IQMOFo-b09s/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Killing The Fat Man: Season 2",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/aZFhQk_pe7Y1yZlJFf6XW01uQLY"',
      id: "PLdWvFCOAvyr2JOHcgMEltu7z3d-sovPj6",
      snippet: {
        publishedAt: "2018-09-27T00:12:37.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 CrossFit Team Series",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/SkU1wk4rcCE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/SkU1wk4rcCE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/SkU1wk4rcCE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/SkU1wk4rcCE/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/SkU1wk4rcCE/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 CrossFit Team Series",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/ADFbm-PTpT_rjxGAAgXUemH3Jj4"',
      id: "PLdWvFCOAvyr2PfTjSvohUhZu_JDpd0sea",
      snippet: {
        publishedAt: "2018-08-04T13:28:05.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 CrossFit Games | Age Group Competition",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/arPAeLFuBaQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/arPAeLFuBaQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/arPAeLFuBaQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 CrossFit Games | Age Group Competition",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/u27631IX3_WKWPwD0Oa4UeRFaPk"',
      id: "PLdWvFCOAvyr0qudHTNyGB_VJXfk0lrHhg",
      snippet: {
        publishedAt: "2018-08-04T13:27:06.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 CrossFit Games | Team Competition",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/sxBKLseFHlk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/sxBKLseFHlk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/sxBKLseFHlk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 CrossFit Games | Team Competition",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/enqH3Di98FybXD7HJQ-jA4L_CSA"',
      id: "PLdWvFCOAvyr0mjRzK0L3OdO3kXdJRa5Yf",
      snippet: {
        publishedAt: "2018-08-04T13:25:39.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 CrossFit Games | Individual Competition",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_Y3t6_074kA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/_Y3t6_074kA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/_Y3t6_074kA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/_Y3t6_074kA/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/_Y3t6_074kA/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 CrossFit Games | Individual Competition",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/LSdiR4AFjYIYGsaZLXxPbq4u2VY"',
      id: "PLdWvFCOAvyr3XaDUvzAaJbS-uye_otlMN",
      snippet: {
        publishedAt: "2018-07-09T17:54:58.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Demostración de movimiento (America latina)",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/WooxeUY6M68/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/WooxeUY6M68/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/WooxeUY6M68/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/WooxeUY6M68/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/WooxeUY6M68/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Demostración de movimiento (America latina)",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Nm-rq2yc1FF-3HWjmHjryDb6UYc"',
      id: "PLdWvFCOAvyr3cJBhGpQuSS2jzutFFwht7",
      snippet: {
        publishedAt: "2018-07-06T20:23:11.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "CrossFit.com WOD",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/VITcZ2OdSIg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/VITcZ2OdSIg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/VITcZ2OdSIg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/VITcZ2OdSIg/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/VITcZ2OdSIg/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "CrossFit.com WOD",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/YoR26vTxCKAhiKSH-V-Y2XB_GQ4"',
      id: "PLdWvFCOAvyr0Fa9CVYWiHPZg7QWBZ8o7c",
      snippet: {
        publishedAt: "2018-06-26T22:13:07.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Pacific Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/b83Wr7WeT9U/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/b83Wr7WeT9U/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/b83Wr7WeT9U/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/b83Wr7WeT9U/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/b83Wr7WeT9U/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Pacific Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/dsbGV4BJeCRc6yUxsIyVk6FxDyc"',
      id: "PLdWvFCOAvyr3jHCW2DKpI5sNFhHBy8T8Y",
      snippet: {
        publishedAt: "2018-06-26T18:22:36.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Meridian Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/xM7gmtOjuWM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/xM7gmtOjuWM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/xM7gmtOjuWM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/xM7gmtOjuWM/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/xM7gmtOjuWM/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Meridian Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/zPaFomyAZEP2TeAOZpq0Vll2dE8"',
      id: "PLdWvFCOAvyr2RWuBQchAvCipAItdBlkBc",
      snippet: {
        publishedAt: "2018-06-25T22:42:53.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Latin America Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/gbZzR0raTws/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/gbZzR0raTws/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/gbZzR0raTws/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/gbZzR0raTws/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/gbZzR0raTws/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Latin America Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/xvvYGqZx0sSRAnmIgGMPKI2POGo"',
      id: "PLdWvFCOAvyr1yS4dgWdeSj3QhAPNKkhpi",
      snippet: {
        publishedAt: "2018-06-25T17:29:28.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 West Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/uPPm3Wc1lMs/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/uPPm3Wc1lMs/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/uPPm3Wc1lMs/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/uPPm3Wc1lMs/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/uPPm3Wc1lMs/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 West Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/M3GrSyXXKNCaJ1dkPCrbqDQqgFc"',
      id: "PLdWvFCOAvyr2bcWm7VAXSiR2O6ReTP50z",
      snippet: {
        publishedAt: "2018-06-22T22:24:43.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 South Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ALiBANQYs0o/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ALiBANQYs0o/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ALiBANQYs0o/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/ALiBANQYs0o/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/ALiBANQYs0o/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 South Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/qRfQOWw1R2xJPpl7Jb1a_sNkwVA"',
      id: "PLdWvFCOAvyr28BiMFuQpEz_2VMOhHfmsF",
      snippet: {
        publishedAt: "2018-06-22T15:31:39.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 East Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/UE3ItNY3FHA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/UE3ItNY3FHA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/UE3ItNY3FHA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/UE3ItNY3FHA/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/UE3ItNY3FHA/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 East Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/pNqAKA2q1Oh-O8MuayJ7rA597RE"',
      id: "PLdWvFCOAvyr2s3Nm8ACcBIL3VCwAYp7CU",
      snippet: {
        publishedAt: "2018-06-22T01:19:28.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Atlantic Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/P5FIGNeRAlY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/P5FIGNeRAlY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/P5FIGNeRAlY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/P5FIGNeRAlY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/P5FIGNeRAlY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Atlantic Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/kXrMVLOGo8DiZ1tZF7DuYUbmBZ0"',
      id: "PLdWvFCOAvyr2ggdS7ejEGAE5VdsNqjTCH",
      snippet: {
        publishedAt: "2018-06-22T01:16:59.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Europe Regional Competition",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/DHfluxbTczw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/DHfluxbTczw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/DHfluxbTczw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/DHfluxbTczw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/DHfluxbTczw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Europe Regional Competition",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/-FQKKEeF6dwXY6erYT-B41jFKcM"',
      id: "PLdWvFCOAvyr3fGWeMtvNJg96A6-txiyzt",
      snippet: {
        publishedAt: "2018-06-18T18:31:22.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Central Regional",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1fQ0Zm4ZGLo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1fQ0Zm4ZGLo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1fQ0Zm4ZGLo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/1fQ0Zm4ZGLo/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/1fQ0Zm4ZGLo/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Central Regional",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/9P4nv-x1tEDlhY9uk_SEKIIlPK4"',
      id: "PLdWvFCOAvyr3ItOLb7Ww0w10J_BMwyHfK",
      snippet: {
        publishedAt: "2018-05-26T17:48:24.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Noah Ohlsen",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/bjAhi3t9Zko/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/bjAhi3t9Zko/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/bjAhi3t9Zko/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/bjAhi3t9Zko/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/bjAhi3t9Zko/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Noah Ohlsen",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/L-FKcQTyNC79gAOQY8N9WAWXo20"',
      id: "PLdWvFCOAvyr32H7c6JFIDBkzmgXVi-VWU",
      snippet: {
        publishedAt: "2018-05-10T16:43:30.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Demonstração de movimento",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/cReY8bUTiCM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/cReY8bUTiCM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/cReY8bUTiCM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/cReY8bUTiCM/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/cReY8bUTiCM/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Demonstração de movimento",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/8nK9gQ7Fl5U6Y0dAfLpzEY3IKpE"',
      id: "PLdWvFCOAvyr18zp6eNmNbQMO3-tVIsmcR",
      snippet: {
        publishedAt: "2018-05-10T16:09:58.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Regional Event Details",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/m-nNEQ0vtaY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/m-nNEQ0vtaY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/m-nNEQ0vtaY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/m-nNEQ0vtaY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/m-nNEQ0vtaY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Regional Event Details",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/dKNUxgl_BnFQEhWXRV8J3xNP1Tg"',
      id: "PLdWvFCOAvyr0art7wo26mFpxnFijhSnVA",
      snippet: {
        publishedAt: "2018-05-09T21:48:18.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Español",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/XAAaYvxE65g/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/XAAaYvxE65g/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/XAAaYvxE65g/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/XAAaYvxE65g/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/XAAaYvxE65g/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Español",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/5pQbneYP7kBsbJcQbNZwLfxhwFw"',
      id: "PLdWvFCOAvyr3Edm7ir5T0gCA4PuMXvuqn",
      snippet: {
        publishedAt: "2018-04-26T18:24:06.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Regionals",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/LuzyJNVRVg4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/LuzyJNVRVg4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/LuzyJNVRVg4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/LuzyJNVRVg4/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/LuzyJNVRVg4/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Regionals",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/JwJKwXTKJql4GvjN551ext7bV48"',
      id: "PLdWvFCOAvyr2cSoKVkNGmTam0mBRxSn7V",
      snippet: {
        publishedAt: "2018-04-23T17:45:15.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Démonstration de Mouvement",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/HS-mrpLDF38/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/HS-mrpLDF38/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/HS-mrpLDF38/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/HS-mrpLDF38/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/HS-mrpLDF38/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Démonstration de Mouvement",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/-BAo43sSQaoruM35mXmJu06jYcw"',
      id: "PLdWvFCOAvyr2MglF3CnXDPVjecSpdHtpr",
      snippet: {
        publishedAt: "2018-04-23T17:30:44.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Dan Bailey",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/a1qMgAGVCxo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/a1qMgAGVCxo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/a1qMgAGVCxo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/a1qMgAGVCxo/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/a1qMgAGVCxo/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Dan Bailey",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/uijUPlbyRZmjmgfK74OD_Um8lUE"',
      id: "PLdWvFCOAvyr21XX6jTmmNXpRIk2yM0-gP",
      snippet: {
        publishedAt: "2018-04-19T21:44:30.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Dimostrazione del movimento",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ETiczT7n6kk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ETiczT7n6kk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ETiczT7n6kk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/ETiczT7n6kk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/ETiczT7n6kk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Dimostrazione del movimento",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/G_L4kVCnFOeW8LK2AQX0q4_zWdg"',
      id: "PLdWvFCOAvyr3BqmQykQj_QtkKPgtNR9Bf",
      snippet: {
        publishedAt: "2018-04-19T21:32:43.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Bewegung Demonstrationen",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/GUej0g6Z0Io/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/GUej0g6Z0Io/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/GUej0g6Z0Io/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/GUej0g6Z0Io/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/GUej0g6Z0Io/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Bewegung Demonstrationen",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/UQgp_QfWvYkmpiSBd36nPECtoY0"',
      id: "PLdWvFCOAvyr01cuXTYJ99kMJmxfVMhHqp",
      snippet: {
        publishedAt: "2018-04-11T20:56:29.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Out of the Box",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/rCDoRGq107s/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/rCDoRGq107s/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/rCDoRGq107s/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/rCDoRGq107s/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/rCDoRGq107s/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Out of the Box",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/UnNQFEBwdYthgQ9dYu9DzE8lQRE"',
      id: "PLdWvFCOAvyr2nM9Bf2HdrtixcqSZCfFFD",
      snippet: {
        publishedAt: "2018-03-25T16:31:38.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Kai Rainey - My Last Fat Summer",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/4-U5KL9M8Zo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/4-U5KL9M8Zo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/4-U5KL9M8Zo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/4-U5KL9M8Zo/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/4-U5KL9M8Zo/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Kai Rainey - My Last Fat Summer",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/HBDmcw_hwPKBCC9YlPW3xXfbFiQ"',
      id: "PLdWvFCOAvyr0iFK-oH8-VVGYBjCksfTds",
      snippet: {
        publishedAt: "2018-03-20T17:46:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Do Brasil: Vivendo o Open",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/rkKdq6PtCdw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/rkKdq6PtCdw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/rkKdq6PtCdw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/rkKdq6PtCdw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/rkKdq6PtCdw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Do Brasil: Vivendo o Open",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Hu_EAZWmYt4yeHbzejYDP6qMyic"',
      id: "PLdWvFCOAvyr3hy1cVaRSn90l0_1_ZxzpA",
      snippet: {
        publishedAt: "2018-03-17T15:27:24.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Weight Loss",
        description:
          "Stories of dramatic weight loss through CrossFit’s prescription of constantly varied functional movement at relatively high intensity and proper nutrition",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/XkZ8qYe1oNY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/XkZ8qYe1oNY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/XkZ8qYe1oNY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/XkZ8qYe1oNY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/XkZ8qYe1oNY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Weight Loss",
          description:
            "Stories of dramatic weight loss through CrossFit’s prescription of constantly varied functional movement at relatively high intensity and proper nutrition",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/YAQAIGrsMW-9MWHBjAmQyMQzNK8"',
      id: "PLdWvFCOAvyr3TbWRTbc3xqriFjKlX31hQ",
      snippet: {
        publishedAt: "2018-03-07T23:39:33.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Inside the Leaderboard 2018",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/eRsSvjeStvU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/eRsSvjeStvU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/eRsSvjeStvU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/eRsSvjeStvU/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/eRsSvjeStvU/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Inside the Leaderboard 2018",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/zkAUE6pGESE0MfBqYMTZVJ62suQ"',
      id: "PLdWvFCOAvyr2BgdOvrABBFgTtujbuI3Sf",
      snippet: {
        publishedAt: "2018-02-26T20:33:24.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Matt Bickel on the Podcast",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Ixcl3j4YeLY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Ixcl3j4YeLY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Ixcl3j4YeLY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/Ixcl3j4YeLY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/Ixcl3j4YeLY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Matt Bickel on the Podcast",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/HKQNYAmpxMLQ1YkUjuZ0QmSpmqU"',
      id: "PLdWvFCOAvyr0LiZ7aeo9_tXbYM_CdArhb",
      snippet: {
        publishedAt: "2018-02-20T00:42:34.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Inside The Journal Series",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/jMPBXaaC1O8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/jMPBXaaC1O8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/jMPBXaaC1O8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/jMPBXaaC1O8/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/jMPBXaaC1O8/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Inside The Journal Series",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/eHgi40hieDs5PVrzi76fIKFIAmI"',
      id: "PLdWvFCOAvyr3_pTvTxuSD-kpTqrcRnQDs",
      snippet: {
        publishedAt: "2018-02-09T18:03:06.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Trailers",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8QeUid89vKw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/8QeUid89vKw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/8QeUid89vKw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/8QeUid89vKw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/8QeUid89vKw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Trailers",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/Sok8lirHw-55CfM7uV0OI62afOM"',
      id: "PLdWvFCOAvyr3smKaDnwaLDpwu9FKEA25U",
      snippet: {
        publishedAt: "2018-02-06T19:14:18.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Regionals Previews",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/NuJCBvZc27g/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/NuJCBvZc27g/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/NuJCBvZc27g/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/NuJCBvZc27g/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/NuJCBvZc27g/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Regionals Previews",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/eaaEJhA92CTyH5JteMqmrmhs8qE"',
      id: "PLdWvFCOAvyr15EtEFQdyiZ3XOJU5ZNdtH",
      snippet: {
        publishedAt: "2018-02-06T19:13:56.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 Update Studio",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/enurfYCiILk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/enurfYCiILk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/enurfYCiILk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/enurfYCiILk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/enurfYCiILk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 Update Studio",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/PiQE6mPoyocmmPO7ZJ126HPKjuk"',
      id: "PLdWvFCOAvyr0M1p8--Bl_fng8lubfruPj",
      snippet: {
        publishedAt: "2018-01-26T16:07:15.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Fitter at Any Age",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/xsJJYHl8pVg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/xsJJYHl8pVg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/xsJJYHl8pVg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/xsJJYHl8pVg/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/xsJJYHl8pVg/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Fitter at Any Age",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/0zZA42CAkg90-SP86cfCAkVfF6Y"',
      id: "PLdWvFCOAvyr0GYGWHVlKvW_DyPKw2H1SN",
      snippet: {
        publishedAt: "2018-01-15T19:24:46.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Cooking with Nick Massie",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/IVmJLlbUv6k/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/IVmJLlbUv6k/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/IVmJLlbUv6k/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/IVmJLlbUv6k/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/IVmJLlbUv6k/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Cooking with Nick Massie",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/kSXwy6EuyUZ-dA4mCcTjWdyeZz0"',
      id: "PLdWvFCOAvyr0dT3jGZRtmO4Be-md9BkWI",
      snippet: {
        publishedAt: "2018-01-11T21:23:11.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "The 2018 Open",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8fXO9cuQb7Q/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/8fXO9cuQb7Q/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/8fXO9cuQb7Q/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/8fXO9cuQb7Q/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/8fXO9cuQb7Q/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "The 2018 Open",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/hMdTirBrKhR8D_I-Wkw7f5EqdtI"',
      id: "PLdWvFCOAvyr2JqKe2k_iMlN-N6X3NkST1",
      snippet: {
        publishedAt: "2018-01-08T22:53:45.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "2018 CrossFit Games",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/rxhx2n-fgKQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/rxhx2n-fgKQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/rxhx2n-fgKQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/rxhx2n-fgKQ/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/rxhx2n-fgKQ/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "2018 CrossFit Games",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/W7J5jZHNI71DmXjmcZnsLFNSOVk"',
      id: "PLdWvFCOAvyr0hAwwAYKjySUao88NXQ8zZ",
      snippet: {
        publishedAt: "2017-12-20T22:55:40.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Rory in Ireland",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/0tXOBdWTSz0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/0tXOBdWTSz0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/0tXOBdWTSz0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/0tXOBdWTSz0/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/0tXOBdWTSz0/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Rory in Ireland",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/D2x2Qs_-3XmJgictQI_VUMWD5lU"',
      id: "PLdWvFCOAvyr3lL-1cCEpa3d2tMj40l03R",
      snippet: {
        publishedAt: "2017-11-22T18:46:22.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Podcast Shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Wv9cyMwzNbQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Wv9cyMwzNbQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Wv9cyMwzNbQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/Wv9cyMwzNbQ/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/Wv9cyMwzNbQ/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Podcast Shorts",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/zLyhtYhCXxprQHMPQ9BHBMjjgEg"',
      id: "PLdWvFCOAvyr2Lrd7iRNZgYp-eSXP911e3",
      snippet: {
        publishedAt: "2017-11-14T23:07:48.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "Inside CrossFit South Brooklyn",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/BKr0qkhX6cg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/BKr0qkhX6cg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/BKr0qkhX6cg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/BKr0qkhX6cg/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/BKr0qkhX6cg/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "Inside CrossFit South Brooklyn",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/3ygIq1SIESh0894tX85c4N5FIZI"',
      id: "PLdWvFCOAvyr1D7oAxAlPI7dUpL9_3tv0-",
      snippet: {
        publishedAt: "2017-10-13T16:31:38.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "CrossFit Saved My Life",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/3jFvXDJ8Sqk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/3jFvXDJ8Sqk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/3jFvXDJ8Sqk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/3jFvXDJ8Sqk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/3jFvXDJ8Sqk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "CrossFit Saved My Life",
          description: "",
        },
      },
    },
    {
      kind: "youtube#playlist",
      etag: '"tnVOtk4NeGU6nDncDTE5m9SmuHc/amhkQ9IwaaJjDLJTiHW_VBBQNes"',
      id: "PLdWvFCOAvyr1sQLyXTICMPq77s-fPdxT1",
      snippet: {
        publishedAt: "2017-09-09T18:30:06.000Z",
        channelId: "UCtcQ6TPwXAYgZ1Mcl3M1vng",
        title: "The CrossFit Podcast",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_hVKhtn7pII/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/_hVKhtn7pII/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/_hVKhtn7pII/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/_hVKhtn7pII/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/_hVKhtn7pII/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "CrossFit®",
        localized: {
          title: "The CrossFit Podcast",
          description: "",
        },
      },
    },
  ],
};
