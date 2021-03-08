import React, { Component} from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, Linking } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import FAQDetailItem from '../components/FAQDetailItem';
import {em} from '../common/constants'
import { goToWebBrowser } from '../common/utils';

const DATA = [
  {
    id: 1,
    type : "title",
    title: "Conditions Générales d’Utilisation",
    description: 'Absolute Micro ("Absolute Micro" ou "nous" ou "notre" ou d’autres pronoms similaires) prend vos questions de confidentialité très au sérieux. Veuillez lire ce qui suit pour en savoir plus sur notre Politique de confidentialité ("Politique"). Cette Politique détaille la façon dont nous recevons, recueillons et utilisons les informations relatives aux sites Web de Tina (« Site ») et aux applications mobiles de Tina, comme indiqué dans la section “1” du document concernant le RGPD et Politique de confidentialité des applications mobiles de Tina (« Application »), toutes deux appelées « Service »., publié par nous. En visitant le site à l’aide de l’application, vous acceptez les politiques et les pratiques décrites dans la présente politique, car cette politique peut être modifiée de temps à autre. Chaque fois que vous visitez le Site ou utilisez l’Application, vous acceptez et consentez expressément à ce que nous recueillions, utilisions et divulguions les informations que vous fournissez conformément à la présente Politique.SI VOUS ÊTES UN UTILISATEUR ACCÉDANT AU SITE OU À L’APPLICATION EN PROVENANCE DES ÉTATS-UNIS, D’ASIE OU DE TOUTE AUTRE RÉGION AYANT DES LOIS OU RÈGLEMENTS RÉGISSANT LA COLLECTE, L’UTILISATION ET LA DIVULGATION DE DONNÉES PERSONNELLES QUI DIFFÈRENT DE LA LÉGISLATION FRANÇAISE, VEUILLEZ NOTER QUE PAR VOTRE UTILISATION CONTINUE DU SITE ET DE L’APPLICATION, QUI SONT RÉGIS PAR LA LOI FRANÇAISE, CETTE POLITIQUE DE CONFIDENTIALITÉ, VOUS POUVEZ TRANSMETTRE VOS INFORMATIONS PERSONNELLES (TELLES QUE DÉFINIES DANS LE CHAPITRE 1 CI-DESSOUS) À DES PAYS (DONT LA FRANCE) OÙ LES LOIS RELATIVES AU TRAITEMENT DES INFORMATIONS PERSONNELLES (TELLES QUE DÉFINIES DANS LE CHAPITRE 1 CI-DESSOUS) PEUT ÊTRE MOINS RIGOUREUX QUE LE TRAITEMENT DES RENSEIGNEMENTS PERSONNELS DANS VOTRE PAYS ET VOUS CONSENTEZ PAR LES PRÉSENTES À LA TRANSMISSION DE CES RENSEIGNEMENTS PERSONNELS.',
  },

  {
    id: 2,
    type : "title",

    title: "1. Collecte et utilisation des renseignements ",
    description: "",
  },

  {
    id: 3,
    type : "stitle",
    title: "1.1. Renseignements personnels",
    description: 'Pour être clair sur la terminologie que nous utilisons, lorsque nous utilisons l’expression "Renseignements personnels" dans la présente Politique, nous nous référons à l’information recueillie sur le Site ou l’Application à votre sujet qui est personnellement identifiable et toute autre information non publique qui vous est associée, mais en excluant les informations du logiciel et les informations de localisation telles que définies ci-dessous.',
  },

  {
    id: 4,
    type : "stitle",

    title: "1.2. Information du logiciel",
    description: "Vous pouvez vous rendre sur notre site et/ou télécharger l’application depuis un autre site Web. En outre, notre Service peut contenir des liens qui vous permettront de quitter notre Service et d’accéder à un autre site Web ou une autre application. Les sites Web ou applications liés à notre Service ne sont pas sous le contrôle d’Absolute Micro et il est possible que ces sites Web ou applications aient une politique de confidentialité différente. Notre Politique s’applique uniquement aux Informations personnelles acquises sur le Site ou par votre utilisation de notre Application. Nous vous exhortons à faire attention lorsque vous entrez des renseignements personnels en ligne. Nous n’acceptons aucune responsabilité pour ces autres sites Web.",
  },  
  {
    id: 5,
    type : "stitle",

    title: "1.3. Sites de tiers et pratiques en matière de protection des renseignements personnels",
    description: "Pour des raisons de persistance des données, vos informations sont stockées sur nos serveurs.Les serveurs utilisés par Absolute Micro qui sont utilisés pour stocker vos informations sont détenus et hébergés par Alwaysdata,, société située en France.Absolute Micro utilisera les Informations aux fins de la fonctionnalité elle-même. Absolute Micro ne doit pas utiliser les renseignements d’identification à d’autres fins. Absolute Micro a le droit d’utiliser les informations sur les caractéristiques de manière anonyme (sans aucune information d’identification) pour tout usage statistique, commercial ou non. Dans ce cas, les données doivent être utilisées sans aucune information d’identification. À tout moment, vous pouvez librement demander la suppression de vos coordonnées de la base de données. Dans ce cas, Absolute Micro supprimera définitivement toutes les informations d’identification relatives à vos données, mais a le droit de conserver les informations de caractéristiques à des fins statistiques décrites ci-dessus.",
  },
  {
    id: 6,
    type : "stitle",

    title: "1.4. Collecte des données analytiques",
    description: "Absolute Micro utilise Google Analytics et son propre service d’analyse pour suivre et signaler anonymement les informations de comportement des utilisateurs/visiteurs et les informations de journal standard des utilisateurs sur le site et l’application. Ces renseignements (y compris, sans s’y limiter, l’adresse IP, l’identifiant publicitaire, le stockage des données, les services de maintenance, la gestion des bases de données, le Web analytique et le traitement de l’information) nous aide à analyser et à évaluer la façon dont l’application et le site sont utilisés dans le cadre de nos efforts continus pour améliorer les fonctions et les services du site et de l’application. Aucune donnée d’identification personnelle n’est incluse dans ce type de déclaration. La série analytique peut avoir accès à vos informations uniquement aux fins de l’exécution de ces tâches et au nom d’Absolute Micro et en vertu d’obligations similaires à celles de la présente politique de confidentialité. Pour plus d’informations sur les conditions qui régissent Google Analytics, veuillez consulter les conditions d’utilisation de Google Analytics. Nous n’utiliserons jamais (et ne permettrons à aucun tiers) les services d’analyse statistique pour suivre ou recueillir des renseignements personnels sur les visiteurs ou les utilisateurs.",
  },
  {
    id: 7,
    type : "stitle",

    title: "1.5. Renseignements sur l’emplacement",
    description: "En utilisant l’application, les données relatives à l’emplacement de votre appareil sont collectées et peuvent être partagées avec des tiers de marketing pour vous fournir du contenu et des publicités pertinentes. Ces partenaires peuvent combiner ces données avec d’autres renseignements que vous leur avez fournis ou qu’ils ont recueillis en utilisant leurs propres services. En poursuivant votre navigation dans l’application, vous acceptez la collecte de ces données. données. À tout moment, vous pouvez vous opposer à l’activation et au fonctionnement de cette collection de données en la désactivant dans les paramètres de votre téléphone.",
  }
  ,  {
    id: 8,
    type : "stitle",

    title: "1.6. Cookies et autres données collectées automatiquement",
    description: "Si vous avez autorisé votre appareil à accepter des cookies ou des ID, nous pouvons utiliser des cookies ou des ID sur le Service. Les témoins sont des éléments d’information qu’un site Web transfère au disque dur d’une personne à des fins de tenue de dossiers. Les cookies facilitent la navigation sur le Web en enregistrant les préférences et les habitudes de navigation pendant que vous êtes sur le Site. Les cookies peuvent être utilisés pour analyser l’utilisation du Site, améliorer le contenu, personnaliser le contenu et la mise en page du Site et à d’autres fins de service à la clientèle. Un cookie peut nous permettre d’associer votre utilisation de notre Site à d’autres informations vous concernant, y compris vos Informations personnelles. Tous ces objectifs servent à améliorer et à personnaliser votre expérience sur notre Site. La plupart des navigateurs Web peuvent être configurés pour vous informer lorsqu’un cookie vous a été envoyé et vous donner la possibilité de refuser ce cookie. En outre, si vous avez un lecteur Flash installé sur votre ordinateur, votre lecteur Flash peut être configuré pour rejeter ou supprimer les cookies Flash. Toutefois, le refus d’un cookie peut, dans certains cas, vous empêcher d’utiliser le Site ou certaines zones ou caractéristiques du Site, ou avoir une incidence négative sur leur affichage ou leur fonction. Nos serveurs peuvent collecter automatiquement des données sur votre adresse Internet lorsque vous visitez le Site. Cette information, appelée adresse de protocole Internet, ou adresse IP, est un numéro qui est automatiquement attribué à votre ordinateur par votre fournisseur de services Internet lorsque vous êtes sur Internet. Lorsque vous demandez des pages à partir de notre site, nos serveurs peuvent enregistrer votre adresse IP et, le cas échéant, votre nom de domaine. Votre adresse IP est utilisée pour vous identifier et pour recueillir des informations démographiques sur nos membres et utilisateurs dans leur ensemble, mais n’inclut pas d’informations personnellement identifiables. Notre serveur peut également enregistrer la page de référence qui vous a lié à nous (par exemple, un autre site Web ou un moteur de recherche); les pages que vous visitez sur ce site; le site Web que vous visitez après ce site; les annonces que vous voyez et / ou cliquez sur; autres informations sur le type de navigateur Web, ordinateur, plateforme, logiciel et paramètres connexes que vous utilisez; tout terme de recherche que vous avez entré sur ce site ou un site de référence; et toute autre activité d’utilisation du Web et données enregistrées par nos serveurs. Nous utilisons ces informations pour l’administration interne du système, pour aider à diagnostiquer les problèmes avec nos serveurs, et pour administrer notre site. Ces informations peuvent également être utilisées pour recueillir des informations démographiques, telles que le pays d’origine et le fournisseur de services Internet. Les ID sont des éléments d’information (principalement des ID publicitaires) qu’une application transfère au stockage d’une personne à des fins de tenue de dossiers. Les identifiants facilitent l’utilisation de l’application en sauvegardant les modèles d’utilisation pendant que vous êtes à l’application. Une partie ou la totalité de ces activités concernant les informations d’utilisation du Service peuvent être réalisées en notre nom par nos fournisseurs de services, y compris, par exemple, nos fournisseurs d’analyse et nos partenaires de gestion de courriels." }
  ,  {
    id: 9,
    type : "stitle",

    title: "1.7. Retrait du consentement",
    description: "Si vous utilisez le Site, vous pouvez retirer votre consentement à tout moment. Veuillez cliquer ici pour retirer votre consentement.",
  }
  ,  {
    id: 10,
    type : "stitle",

    title: "1.8. Transformateurs",
    description: "Pour des raisons de persistance des données, vos informations sont stockées sur nos serveurs.Les serveurs utilisés par Absolute Micro qui sont utilisés pour stocker vos informations sont détenus et hébergés par Alwaysdata,, société située en France.Absolute Micro utilisera les Informations aux fins de la fonctionnalité elle-même. Absolute Micro ne doit pas utiliser les renseignements d’identification à d’autres fins. Absolute Micro a le droit d’utiliser les informations sur les caractéristiques de manière anonyme (sans aucune information d’identification) pour tout usage statistique, commercial ou non. Dans ce cas, les données doivent être utilisées sans aucune information d’identification. À tout moment, vous pouvez librement demander la suppression de vos coordonnées de la base de données. Dans ce cas, Absolute Micro supprimera définitivement toutes les informations d’identification relatives à vos données, mais a le droit de conserver les informations de caractéristiques à des fins statistiques décrites ci-dessus.",
  }
  ,  {
    id: 11,
    type : "title",

    title: "2. Partage et divulgation de renseignements",
    description: "Nous ne louons, ne vendons ou ne partageons pas de renseignements personnels avec des tiers, sauf dans les cas décrits dans les présentes ou dans le cas où vous le demandez. Nous pouvons divulguer vos renseignements personnels si nous croyons que cette mesure est nécessaire pour : \na) se conformer à la loi ou à la procédure judiciaire qui nous est signifiée ; \nb) protéger et défendre nos droits ou nos biens (y compris l’exécution de nos ententes);\nc) agir dans des circonstances urgentes pour protéger la sécurité personnelle des utilisateurs de notre application ou des membres du public.\nNous pouvons divulguer des renseignements à votre sujet si nous déterminons que, pour des raisons de sécurité nationale, d’application de la loi ou d’autres questions d’importance publique, la divulgation de renseignements est nécessaire.\n Nous pouvons de temps en temps vous demander de fournir des informations sur vos expériences qui seront utilisées pour mesurer et améliorer la qualité. Vous n’êtes à aucun moment dans l’obligation de fournir ces données. Toutes les informations qui sont volontairement soumises dans les formulaires de commentaires sur le Site, l’Application ou tout sondage auquel vous acceptez de participer sont utilisées aux fins d’examiner ces commentaires et d’améliorer le logiciel, les produits et les sites Web Absolute Micro.",
  },

 {
    id: 12,
    type : "title",

    title: "3. Sécurité",
    description: "Nous prenons des précautions raisonnables pour protéger les renseignements personnels contre l’utilisation abusive, la perte et l’accès non autorisé. Bien que nous ne puissions garantir que les renseignements personnels ne feront pas l’objet d’un accès non autorisé, nous avons des mesures de protection physiques, électroniques et procédurales en place pour protéger les renseignements personnels. Les renseignements personnels sont stockés sur nos serveurs et protégés par des réseaux sécurisés auxquels l’accès est limité à quelques employés et employés autorisés. Cependant, aucune méthode de transmission sur Internet, ni aucune méthode de stockage électronique, n’est sûre à 100 %.",
  },
  {
    id: 13,
    type : "title",

    title: "4. Transitions des entreprises",
    description: "Si nous effectuons une transition commerciale, comme une fusion, une acquisition par une autre entreprise ou la vente de la totalité ou d’une partie de nos actifs, les renseignements personnels figureront probablement parmi les actifs transférés. Dans le cadre d’une telle transaction, la nouvelle entité devra s’engager à assurer le même niveau de protection de vos renseignements personnels que celui décrit dans la présente politique de confidentialité. Si nous ne pouvons pas obtenir un tel engagement, nous n’effectuerons pas la transition commerciale.",
  },
  {
    id: 14,
    type : "title",

    title: "5. Changements apportés à la politique",
    description: "De temps à autre, nous pouvons réviser cette politique. Nous nous réservons le droit de mettre à jour ou de modifier cette Politique, ou toute autre de nos politiques ou pratiques, à tout moment avec ou sans préavis. Toutefois, nous n’utiliserons pas vos renseignements personnels d’une manière sensiblement différente des utilisations décrites dans la présente Politique sans vous donner la possibilité de vous retirer de ces utilisations différentes. Nous afficherons la politique révisée sur le Site et l’application, afin que les utilisateurs puissent toujours être au courant des renseignements que nous recueillons, de la façon dont ils sont utilisés et des circonstances dans lesquelles ces renseignements peuvent être divulgués. Vous consentez à examiner la Politique périodiquement afin d’être au courant de toute modification. Votre utilisation continue du Site ou de l’Application indique que vous consentez à tout changement et signifie que vous acceptez les modalités de notre Politique. Si vous n’êtes pas d’accord avec ces conditions, vous ne devez pas utiliser le Site ou l’Application.",
  },
  {
    id: 15,
    type : "title",

    title: "6. Coordonnées de la personne-ressource",
    description: "Veuillez adresser toute question relative à cette politique par courriel à contact@absolutemicro.fr ou par écrit à Absolute Micro SARL, 18 bis route de Bû 78550 Houdan, France.",
  }
]

class Cgu extends Component {
  constructor(props){
    super(props)
  }

  convertPropToData = () => {
    const {faq} = this.props;
    const data = [{id:faq.id, title:faq.title,type: faq.type, description:faq.description}];
    const answerKeys = Object.keys(faq.answers).reverse();
    answerKeys.map(item => {
      data.push({...faq.answers[item], id:item})
    })
    return data;
  }

  render(){
    //const DATA = this.convertPropToData();
    //let content = DATA.map((item, index) => 
    //  <FAQDetailItem key={item.id.toString()} id={item.id} index={index} title={item.title} description={item.description} />
    //);

    let content = DATA.map((item, index) => 
      <FAQDetailItem key={item.id.toString()} id={item.id} index={index} title={item.title} type = {item.type} description={item.description} />
    );
    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <ScrollView style={{flex:1, paddingLeft: 20*em, paddingRight: 20*em}}>
            {content}

          </ScrollView>
          
          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>                  
          </View>
        </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
  },

  headerContainer: {
    flex: 1
  },

  menuWrapper:{
    position:"absolute", 
    left:20*em,
    top:20*em
  },

  descText:{
    fontSize: 13*em,
    fontFamily:"OpenSans-SemiBold"
  },

  bottomTitle:{
    justifyContent:"center", 
    alignItems:"center",
    flexDirection:"column", 
    paddingTop: 30*em, 
    paddingBottom:80*em
  }
}

export default Cgu;