import { generateUUID, generateUUIDSync } from './uuid';
import { Word } from '../types';

// Definir o tipo de uma entrada de palavra
type VocabularyEntry = {
  word: string;
  translations: string[];
};

// Definir o tipo do vocabulário organizado por dia
interface VocabularyByDay {
  [key: string]: VocabularyEntry[]; // Isso permite indexação por string
}

// Organiza palavras por dia de aprendizado
export const vocabularyByDay: VocabularyByDay = {
  day_1: [
    { word: 'the', translations: ['o', 'a'] },
    { word: 'be', translations: ['ser', 'estar'] },
    { word: 'to', translations: ['para', 'a'] },
    { word: 'of', translations: ['de'] },
    { word: 'and', translations: ['e'] },
    { word: 'a', translations: ['um', 'uma'] },
    { word: 'in', translations: ['em'] },
    { word: 'that', translations: ['que', 'aquele'] },
    { word: 'have', translations: ['ter'] },
    { word: 'I', translations: ['eu'] }
  ],
  
  day_2: [
    { word: 'it', translations: ['ele', 'ela', 'isso'] },
    { word: 'for', translations: ['por', 'para'] },
    { word: 'not', translations: ['não'] },
    { word: 'on', translations: ['em', 'sobre'] },
    { word: 'with', translations: ['com'] },
    { word: 'he', translations: ['ele'] },
    { word: 'as', translations: ['como'] },
    { word: 'you', translations: ['você'] },
    { word: 'do', translations: ['fazer'] },
    { word: 'at', translations: ['em', 'no'] }
  ],
  
  day_3: [
    { word: 'this', translations: ['este', 'esta', 'isso'] },
    { word: 'but', translations: ['mas'] },
    { word: 'his', translations: ['dele'] },
    { word: 'by', translations: ['por'] },
    { word: 'from', translations: ['de', 'desde'] },
    { word: 'they', translations: ['eles', 'elas'] },
    { word: 'we', translations: ['nós'] },
    { word: 'say', translations: ['dizer'] },
    { word: 'her', translations: ['ela', 'dela'] },
    { word: 'she', translations: ['ela'] }
  ],
  
  day_4: [
    { word: 'or', translations: ['ou'] },
    { word: 'will', translations: ['vai', 'vontade'] },
    { word: 'my', translations: ['meu', 'minha'] },
    { word: 'one', translations: ['um'] },
    { word: 'all', translations: ['todos', 'tudo'] },
    { word: 'would', translations: ['seria', 'faria'] },
    { word: 'there', translations: ['lá', 'ali'] },
    { word: 'their', translations: ['deles', 'delas'] },
    { word: 'what', translations: ['o que'] },
    { word: 'so', translations: ['então', 'tão'] }
  ],
  
  day_5: [
    { word: 'up', translations: ['acima', 'para cima'] },
    { word: 'out', translations: ['fora'] },
    { word: 'out', translations: ['sair'] },
    { word: 'if', translations: ['se'] },
    { word: 'about', translations: ['sobre', 'a respeito'] },
    { word: 'who', translations: ['quem'] },
    { word: 'get', translations: ['conseguir', 'obter'] },
    { word: 'which', translations: ['qual', 'o qual'] },
    { word: 'go', translations: ['ir'] },
    { word: 'me', translations: ['mim'] }
  ],
  
  day_6: [
    { word: 'when', translations: ['quando'] },
    { word: 'make', translations: ['fazer', 'criar'] },
    { word: 'can', translations: ['pode', 'lata'] },
    { word: 'like', translations: ['gostar', 'curtir'] },
    { word: 'time', translations: ['tempo', 'hora'] },
    { word: 'no', translations: ['não', 'nenhum(a)'] },
    { word: 'just', translations: ['só', 'apenas'] },
    { word: 'him', translations: ['ele', 'o'] },
    { word: 'know', translations: ['saber', 'conhecer'] },
    { word: 'take', translations: ['tomar', 'pegar'] }
  ],
  
  day_7: [
    { word: 'people', translations: ['pessoas'] },
    { word: 'into', translations: ['para dentro', 'dentro'] },
    { word: 'year', translations: ['ano'] },
    { word: 'your', translations: ['seu', 'sua'] },
    { word: 'good', translations: ['bom', 'bem'] },
    { word: 'some', translations: ['alguns', 'um pouco'] },
    { word: 'could', translations: ['poderia', 'podia'] },
    { word: 'them', translations: ['eles', 'elas', 'lhes'] },
    { word: 'see', translations: ['ver', 'enxergar'] },
    { word: 'other', translations: ['outro'] }
  ],
  
  day_8: [
    { word: 'than', translations: ['do que'] },
    { word: 'then', translations: ['então', 'depois'] },
    { word: 'now', translations: ['agora'] },
    { word: 'look', translations: ['olhar', 'parecer'] },
    { word: 'only', translations: ['só', 'apenas'] },
    { word: 'come', translations: ['vir', 'chegar'] },
    { word: 'its', translations: ['seu', 'sua (neutro)'] },
    { word: 'over', translations: ['sobre', 'acima'] },
    { word: 'think', translations: ['pensar'] },
    { word: 'also', translations: ['também'] }
  ],
  
  day_9: [
    { word: 'back', translations: ['atrás'] },
    { word: 'back', translations: ['costas'] },
    { word: 'like', translations: ['curtida'] },
    { word: 'use', translations: ['usar'] },
    { word: 'two', translations: ['dois'] },
    { word: 'how', translations: ['como'] },
    { word: 'our', translations: ['nosso'] },
    { word: 'work', translations: ['trabalho', 'trabalhar'] },
    { word: 'first', translations: ['primeiro'] },
    { word: 'none', translations: ['nenhum(a)'] }
  ],
  
  day_10: [
    { word: 'well', translations: ['bem', 'poço'] },
    { word: 'way', translations: ['maneira', 'caminho'] },
    { word: 'even', translations: ['até', 'mesmo'] },
    { word: 'new', translations: ['novo'] },
    { word: 'want', translations: ['querer'] },
    { word: 'because', translations: ['porque'] },
    { word: 'any', translations: ['qualquer'] },
    { word: 'these', translations: ['esses', 'essas'] },
    { word: 'give', translations: ['dar'] },
    { word: 'day', translations: ['dia'] }
  ],
  
  day_11: [
    { word: 'most', translations: ['mais', 'a maioria'] },
    { word: 'us', translations: ['nós', 'nos'] },
    { word: 'daily', translations: ['diário(a)'] },
    { word: 'man', translations: ['homem'] },
    { word: 'yearly', translations: ['anualmente'] },
    { word: 'government', translations: ['governo'] },
    { word: 'company', translations: ['empresa'] },
    { word: 'group', translations: ['grupo'] },
    { word: 'problem', translations: ['problema'] },
    { word: 'real', translations: ['real'] }
  ],
  
  day_12: [
    { word: 'friend', translations: ['amigo'] },
    { word: 'place', translations: ['lugar'] },
    { word: 'part', translations: ['parte'] },
    { word: 'thing', translations: ['coisa'] },
    { word: 'information', translations: ['informação'] },
    { word: 'child', translations: ['criança'] },
    { word: 'eye', translations: ['olho'] },
    { word: 'hand', translations: ['mão'] },
    { word: 'woman', translations: ['mulher'] },
    { word: 'week', translations: ['semana'] }
  ],
  
  day_13: [
    { word: 'case', translations: ['caso'] },
    { word: 'point', translations: ['ponto'] },
    { word: 'number', translations: ['número'] },
    { word: 'problem', translations: ['problematizar'] },
    { word: 'world', translations: ['mundo'] },
    { word: 'fact', translations: ['fato'] },
    { word: 'mobile', translations: ['celular'] },
    { word: 'eye', translations: ['olhar'] },
    { word: 'friendly', translations: ['amigável'] },
    { word: 'place', translations: ['colocar', 'pôr'] }
  ],
  
  day_14: [
    { word: 'part', translations: ['dividir'] },
    { word: 'company', translations: ['companhia'] },
    { word: 'factual', translations: ['factual'] },
    { word: 'month', translations: ['mês'] },
    { word: 'lot', translations: ['lote', 'muito'] },
    { word: 'right', translations: ['direito', 'correto'] },
    { word: 'study', translations: ['estudo', 'estudar'] },
    { word: 'book', translations: ['livro'] },
    { word: 'job', translations: ['trabalho', 'emprego'] },
    { word: 'word', translations: ['palavra'] }
  ],
  
  day_15: [
    { word: 'business', translations: ['negócio'] },
    { word: 'issue', translations: ['problema'] },
    { word: 'side', translations: ['lado'] },
    { word: 'kind', translations: ['tipo'] },
    { word: 'head', translations: ['cabeça'] },
    { word: 'rule', translations: ['régua'] },
    { word: 'house', translations: ['casa'] },
    { word: 'service', translations: ['serviço'] },
    { word: 'friend', translations: ['adicionar como amigo (redes sociais)'] },
    { word: 'father', translations: ['pai'] }
  ],
  
  day_16: [
    { word: 'home', translations: ['casa', 'lar'] },
    { word: 'power', translations: ['poder'] },
    { word: 'hour', translations: ['hora'] },
    { word: 'game', translations: ['jogo'] },
    { word: 'line', translations: ['linha'] },
    { word: 'end', translations: ['fim'] },
    { word: 'member', translations: ['membro'] },
    { word: 'law', translations: ['lei'] },
    { word: 'car', translations: ['carro'] },
    { word: 'love', translations: ['amar'] }
  ],
  
  day_17: [
    { word: 'city', translations: ['cidade'] },
    { word: 'community', translations: ['comunidade'] },
    { word: 'name', translations: ['nome'] },
    { word: 'president', translations: ['presidente'] },
    { word: 'team', translations: ['equipe'] },
    { word: 'minute', translations: ['minuto'] },
    { word: 'idea', translations: ['ideia'] },
    { word: 'kid', translations: ['criança'] },
    { word: 'body', translations: ['corpo'] },
    { word: 'inform', translations: ['informar'] }
  ],
  
  day_18: [
    { word: 'parent', translations: ['pai/mãe', 'progenitor'] },
    { word: 'face', translations: ['rosto'] },
    { word: 'others', translations: ['outros'] },
    { word: 'level', translations: ['nível'] },
    { word: 'office', translations: ['escritório'] },
    { word: 'door', translations: ['porta'] },
    { word: 'health', translations: ['saúde'] },
    { word: 'person', translations: ['pessoa'] },
    { word: 'art', translations: ['arte'] },
    { word: 'war', translations: ['guerra'] }
  ],
  
  day_19: [
    { word: 'history', translations: ['história'] },
    { word: 'party', translations: ['festa', 'partido'] },
    { word: 'result', translations: ['resultado'] },
    { word: 'change', translations: ['mudança'] },
    { word: 'tank', translations: ['tanque'] },
    { word: 'morning', translations: ['manhã'] },
    { word: 'reason', translations: ['razão'] },
    { word: 'research', translations: ['pesquisa'] },
    { word: 'girl', translations: ['menina'] },
    { word: 'guy', translations: ['cara', 'rapaz'] }
  ],
  
  day_20: [
    { word: 'buck', translations: ['dinheiro', 'grana'] },
    { word: 'moment', translations: ['momento'] },
    { word: 'air', translations: ['ar'] },
    { word: 'teacher', translations: ['professor'] },
    { word: 'force', translations: ['força'] },
    { word: 'education', translations: ['educação'] },
    { word: 'foot', translations: ['pé'] },
    { word: 'boy', translations: ['menino'] },
    { word: 'age', translations: ['idade'] },
    { word: 'policy', translations: ['política'] }
  ],
  
  // Continuando para os outros dias...
  
  day_21: [
    { word: 'myself', translations: ['eu mesmo(a)'] },
    { word: 'music', translations: ['música'] },
    { word: 'food', translations: ['comida'] },
    { word: 'mother', translations: ['mãe'] },
    { word: 'reading', translations: ['leitura'] },
    { word: 'understanding', translations: ['entendimento'] },
    { word: 'approach', translations: ['abordagem'] },
    { word: 'management', translations: ['gerenciamento'] },
    { word: 'difference', translations: ['diferença'] },
    { word: 'development', translations: ['desenvolvimento'] }
  ],
  
  day_22: [
    { word: 'experience', translations: ['experiência'] },
    { word: 'society', translations: ['sociedade'] },
    { word: 'activity', translations: ['atividade'] },
    { word: 'project', translations: ['projeto'] },
    { word: 'example', translations: ['exemplo'] },
    { word: 'true', translations: ['verdadeiro'] },
    { word: 'picture', translations: ['imagem'] },
    { word: 'environment', translations: ['ambiente'] },
    { word: 'role', translations: ['papel', 'função'] },
    { word: 'situation', translations: ['situação'] }
  ],
  
  day_23: [
    { word: 'future', translations: ['futuro'] },
    { word: 'site', translations: ['local'] },
    { word: 'country', translations: ['país'] },
    { word: 'economy', translations: ['economia'] },
    { word: 'policy', translations: ['apólice'] },
    { word: 'election', translations: ['eleição'] },
    { word: 'thanks', translations: ['agradecimentos'] },
    { word: 'weekly', translations: ['semanalmente'] },
    { word: 'direction', translations: ['direção'] },
    { word: 'marketing', translations: ['marketing'] }
  ],
  
  day_24: [
    { word: 'university', translations: ['universidade'] },
    { word: 'truth', translations: ['verdade'] },
    { word: 'agreement', translations: ['acordo'] },
    { word: 'analysis', translations: ['análise'] },
    { word: 'population', translations: ['população'] },
    { word: 'storyline', translations: ['narrativa'] },
    { word: 'environmental', translations: ['ambiental'] },
    { word: 'way', translations: ['via'] },
    { word: 'relationship', translations: ['relacionamento'] },
    { word: 'performance', translations: ['desempenho'] }
  ],
  
  day_25: [
    { word: 'decision', translations: ['decisão'] },
    { word: 'church', translations: ['igreja'] },
    { word: 'risk', translations: ['risco'] },
    { word: 'thank', translations: ['agradecer'] },
    { word: 'false', translations: ['falso'] },
    { word: 'animal', translations: ['animal'] },
    { word: 'region', translations: ['região'] },
    { word: 'television', translations: ['televisão'] },
    { word: 'call', translations: ['ligação', 'reunião'] },
    { word: 'box', translations: ['caixa'] }
  ],
  
  // Continuando com o padrão...
  day_26: [
    { word: 'training', translations: ['treinamento'] },
    { word: 'money', translations: ['dinheiro'] },
    { word: 'view', translations: ['visão', 'vista'] },
    { word: 'deal', translations: ['acordo', 'trato'] },
    { word: 'series', translations: ['série'] },
    { word: 'thought', translations: ['pensamento'] },
    { word: 'language', translations: ['linguagem'] },
    { word: 'brother', translations: ['irmão'] },
    { word: 'quality', translations: ['qualidade'] },
    { word: 'opportunity', translations: ['oportunidade'] }
  ],
  
  day_27: [
    { word: 'conference', translations: ['conferência'] },
    { word: 'assessment', translations: ['avaliação'] },
    { word: 'officer', translations: ['oficial'] },
    { word: 'strategy', translations: ['estratégia'] },
    { word: 'player', translations: ['jogador'] },
    { word: 'record', translations: ['registro'] },
    { word: 'food', translations: ['rango'] },
    { word: 'study', translations: ['escritório'] },
    { word: 'medicine', translations: ['medicina'] },
    { word: 'school', translations: ['escola'] }
  ],
  
  day_28: [
    { word: 'network', translations: ['rede'] },
    { word: 'application', translations: ['aplicação'] },
    { word: 'tell', translations: ['contar'] },
    { word: 'practice', translations: ['prática'] },
    { word: 'base', translations: ['base'] },
    { word: 'attention', translations: ['atenção'] },
    { word: 'theory', translations: ['teoria'] },
    { word: 'purpose', translations: ['propósito'] },
    { word: 'responsibility', translations: ['responsabilidade'] },
    { word: 'apart', translations: ['distante'] }
  ],
  
  day_29: [
    { word: 'per', translations: ['por'] },
    { word: 'charge', translations: ['cobrança'] },
    { word: 'tax', translations: ['imposto'] },
    { word: 'director', translations: ['diretor'] },
    { word: 'face', translations: ['encarar'] },
    { word: 'position', translations: ['posição'] },
    { word: 'reason', translations: ['raciocinar', 'argumentar'] },
    { word: 'look', translations: ['aparência'] },
    { word: 'fake', translations: ['falso'] },
    { word: 'well-being', translations: ['bem estar'] }
  ],
  
  day_30: [
    { word: 'laywer', translations: ['advogado(a)'] },
    { word: 'educate', translations: ['educar', 'instruir'] },
    { word: 'event', translations: ['evento'] },
    { word: 'businessman', translations: ['empresário'] },
    { word: 'picture', translations: ['imaginar'] },
    { word: 'task', translations: ['tarefa'] },
    { word: 'property', translations: ['propriedade'] },
    { word: 'develop', translations: ['desenvolver-se'] },
    { word: 'patient', translations: ['paciente'] },
    { word: 'method', translations: ['método'] }
  ],
  
  day_31: [
    { word: 'issue', translations: ['questão'] },
    { word: 'act', translations: ['ato'] },
    { word: 'thinking', translations: ['pensamento'] },
    { word: 'figure', translations: ['figura'] },
    { word: 'street', translations: ['rua'] },
    { word: 'definition', translations: ['definição'] },
    { word: 'model', translations: ['modelo'] },
    { word: 'area', translations: ['área'] },
    { word: 'disease', translations: ['doença'] },
    { word: 'knowledge', translations: ['conhecimento'] }
  ],
  
  day_32: [
    { word: 'limit', translations: ['limite'] },
    { word: 'collection', translations: ['coleção'] },
    { word: 'themselves', translations: ['eles(as) mesmos(as)'] },
    { word: 'court', translations: ['tribunal'] },
    { word: 'price', translations: ['preço'] },
    { word: 'road', translations: ['estrada'] },
    { word: 'behavior', translations: ['comportamento'] },
    { word: 'force', translations: ['forçar'] },
    { word: 'effect', translations: ['efeito'] },
    { word: 'executive', translations: ['executivo'] }
  ],
  
  day_33: [
    { word: 'love', translations: ['amor'] },
    { word: 'night', translations: ['noite'] },
    { word: 'date', translations: ['data'] },
    { word: 'material', translations: ['material'] },
    { word: 'loss', translations: ['perda'] },
    { word: 'variable', translations: ['variável'] },
    { word: 'rule', translations: ['comandar', 'reger'] },
    { word: 'reference', translations: ['referência'] },
    { word: 'committee', translations: ['comitê'] },
    { word: 'solution', translations: ['solução'] }
  ],
  
  day_34: [
    { word: 'addition', translations: ['adição', 'além disso'] },
    { word: 'figure', translations: ['calcular'] },
    { word: 'park', translations: ['parque'] },
    { word: 'paper', translations: ['papel'] },
    { word: 'term', translations: ['termo'] },
    { word: 'present', translations: ['presente'] },
    { word: 'voice', translations: ['voz'] },
    { word: 'border', translations: ['fronteira'] },
    { word: 'bank', translations: ['banco'] },
    { word: 'claim', translations: ['reivindicação'] }
  ],
  
  day_35: [
    { word: 'criticism', translations: ['crítica'] },
    { word: 'asset', translations: ['ativo'] },
    { word: 'agency', translations: ['agência'] },
    { word: 'institution', translations: ['instituição'] },
    { word: 'see', translations: ['veja (bem)'] },
    { word: 'lunch', translations: ['almoço'] },
    { word: 'farm', translations: ['fazenda'] },
    { word: 'award', translations: ['prêmio'] },
    { word: 'text', translations: ['texto'] },
    { word: 'model', translations: ['modelar'] }
  ],
  
  day_36: [
    { word: 'art', translations: ['arte'] },
    { word: 'head', translations: ['chefiar'] },
    { word: 'rule', translations: ['regra'] },
    { word: 'concept', translations: ['conceito'] },
    { word: 'division', translations: ['divisão'] },
    { word: 'source', translations: ['fonte'] },
    { word: 'disease', translations: ['doença'] },
    { word: 'page', translations: ['página'] },
    { word: 'link', translations: ['link'] },
    { word: 'post', translations: ['postagem'] }
  ],
  
  day_37: [
    { word: 'minority', translations: ['minoria'] },
    { word: 'partner', translations: ['parceiro'] },
    { word: 'profession', translations: ['profissão'] },
    { word: 'building', translations: ['edifício'] },
    { word: 'game', translations: ['jogar (jogos de azar)'] },
    { word: 'newspaper', translations: ['jornal'] },
    { word: 'accident', translations: ['acidente'] },
    { word: 'hospital', translations: ['hospital'] },
    { word: 'chain', translations: ['corrente'] },
    { word: 'side', translations: ['lateral'] }
  ],
  
  day_38: [
    { word: 'sentence', translations: ['sentença'] },
    { word: 'association', translations: ['associação'] },
    { word: 'scholarship', translations: ['bolsa de estudos'] },
    { word: 'argument', translations: ['argumento'] },
    { word: 'competition', translations: ['competição'] },
    { word: 'software', translations: ['software'] },
    { word: 'glass', translations: ['vidro'] },
    { word: 'answer', translations: ['resposta'] },
    { word: 'broadcast', translations: ['transmissão'] },
    { word: 'demand', translations: ['demanda'] }
  ],
  
  day_39: [
    { word: 'process', translations: ['processo'] },
    { word: 'heart', translations: ['coração'] },
    { word: 'businesswoman', translations: ['empresária'] },
    { word: 'sense', translations: ['sentido'] },
    { word: 'scholar', translations: ['acadêmico'] },
    { word: 'report', translations: ['relatório'] },
    { word: 'mother', translations: ['cuidar', 'agir como mãe'] },
    { word: 'occasional', translations: ['eventual'] },
    { word: 'letter', translations: ['carta'] },
    { word: 'condition', translations: ['condicionar'] }
  ],
  
  day_40: [
    { word: 'choice', translations: ['escolha'] },
    { word: 'single', translations: ['solteiro', 'único'] },
    { word: 'measure', translations: ['medida'] },
    { word: 'work', translations: ['funcionar'] },
    { word: 'letter', translations: ['letra'] },
    { word: 'movie', translations: ['filme'] },
    { word: 'operation', translations: ['operação'] },
    { word: 'window', translations: ['janela'] },
    { word: 'support', translations: ['suporte'] },
    { word: 'pet', translations: ['animal de estimação'] }
  ],
  
  day_41: [
    { word: 'attentive', translations: ['atencioso(a)'] },
    { word: 'research', translations: ['pesquisar'] },
    { word: 'universally', translations: ['universalmente'] },
    { word: 'capital', translations: ['capital'] },
    { word: 'debate', translations: ['debate'] },
    { word: 'movement', translations: ['movimento'] },
    { word: 'buddy', translations: ['amigão(a)'] },
    { word: 'army', translations: ['exército'] },
    { word: 'camera', translations: ['câmera'] },
    { word: 'animal', translations: ['animal', 'animalesco'] }
  ],
  
  day_42: [
    { word: 'discussion', translations: ['discussão'] },
    { word: 'universe', translations: ['universo'] },
    { word: 'statement', translations: ['declaração'] },
    { word: 'description', translations: ['descrição'] },
    { word: 'credit', translations: ['crédito'] },
    { word: 'impact', translations: ['impacto'] },
    { word: 'directory', translations: ['diretório'] },
    { word: 'strata', translations: ['estrato'] },
    { word: 'presence', translations: ['presença'] },
    { word: 'plane', translations: ['avião'] }
  ],
  
  day_43: [
    { word: 'article', translations: ['artigo'] },
    { word: 'teach', translations: ['ensinar'] },
    { word: 'say', translations: ['por exemplo', 'por assim dizer'] },
    { word: 'play', translations: ['jogar', 'brincar'] },
    { word: 'coach', translations: ['treinador'] },
    { word: 'dog', translations: ['cachorro'] },
    { word: 'rate', translations: ['avaliar'] },
    { word: 'structure', translations: ['estrutura'] },
    { word: 'fund', translations: ['fundo'] },
    { word: 'informative', translations: ['informativo'] }
  ],
  
  day_44: [
    { word: 'profit', translations: ['lucro'] },
    { word: 'situate', translations: ['situar-se'] },
    { word: 'standard', translations: ['padrão'] },
    { word: 'watch', translations: ['assistir', 'relógio'] },
    { word: 'performance', translations: ['performance', 'desempenho'] },
    { word: 'challenge', translations: ['desafio'] },
    { word: 'space', translations: ['espaço'] },
    { word: 'tool', translations: ['ferramenta'] },
    { word: 'glass', translations: ['copo'] },
    { word: 'demand', translations: ['demandar'] }
  ],
  
  day_45: [
    { word: 'secretary', translations: ['secretário', 'secretária'] },
    { word: 'meeting', translations: ['reunião'] },
    { word: 'purpose', translations: ['porpor-se'] },
    { word: 'risk', translations: ['arriscar'] },
    { word: 'deals', translations: ['negócios', 'acordos'] },
    { word: 'author', translations: ['autor', 'autora'] },
    { word: 'budget', translations: ['orçamento'] },
    { word: 'wish', translations: ['desejo'] },
    { word: 'crowd', translations: ['multidão'] },
    { word: 'fish', translations: ['peixe'] }
  ],
  
  day_46: [
    { word: 'ourselves', translations: ['nós mesmos(as)'] },
    { word: 'process', translations: ['processar'] },
    { word: 'element', translations: ['elemento'] },
    { word: 'doubt', translations: ['dúvida'] },
    { word: 'team', translations: ['formar time'] },
    { word: 'horse', translations: ['cavalo'] },
    { word: 'trend', translations: ['tendência'] },
    { word: 'target', translations: ['alvo'] },
    { word: 'prison', translations: ['prisão'] },
    { word: 'guard', translations: ['guarda'] }
  ],
  
  day_47: [
    { word: 'terms', translations: ['termos'] },
    { word: 'reporter', translations: ['repórter'] },
    { word: 'delivery', translations: ['entrega'] },
    { word: 'text', translations: ['mandar texto'] },
    { word: 'share', translations: ['compartilhar'] },
    { word: 'toolkit', translations: ['caixa de ferramenta'] },
    { word: 'vehicle', translations: ['veículo'] },
    { word: 'flight', translations: ['voo'] },
    { word: 'inside', translations: ['dentro'] },
    { word: 'emerge', translations: ['emergir'] }
  ],
  
  day_48: [
    { word: 'placed', translations: ['posto', 'colocado'] },
    { word: 'train', translations: ['trem', 'treinar'] },
    { word: 'E', translations: ['E (letra do alfabeto)'] },
    { word: 'practice', translations: ['praticar'] },
    { word: 'disclose', translations: ['divulgar'] },
    { word: 'supply', translations: ['fornecer'] },
    { word: 'couple', translations: ['casal'] },
    { word: 'choose', translations: ['escolher'] },
    { word: 'wish', translations: ['desejar'] },
    { word: 'artsy', translations: ['artístico', 'criativo'] }
  ],
  
  day_49: [
    { word: 'deal', translations: ['negociar', 'acordar'] },
    { word: 'range', translations: ['gama', 'alcance'] },
    { word: 'camp', translations: ['acampamento'] },
    { word: 'brain', translations: ['cérebro'] },
    { word: 'trend', translations: ['tender'] },
    { word: 'bet', translations: ['aposta'] },
    { word: 'book', translations: ['alugar'] },
    { word: 'room', translations: ['quarto', 'alojar-se'] },
    { word: 'features', translations: ['características'] },
    { word: 'launch', translations: ['lançamento'] }
  ],
  
  day_50: [
    { word: 'like', translations: ['como'] },
    { word: 'museum', translations: ['museu'] },
    { word: 'featuring', translations: ['com participação de'] },
    { word: 'racing', translations: ['corrida'] },
    { word: 'different', translations: ['diferente'] },
    { word: 'faith', translations: ['fé'] },
    { word: 'charge', translations: ['cobrar'] },
    { word: 'gender', translations: ['gênero'] },
    { word: 'earn', translations: ['ganhar'] },
    { word: 'drive', translations: ['dirigir', 'unidade de armazenamento'] }
  ],
  
  day_51: [
    { word: 'count', translations: ['contar'] },
    { word: 'escape', translations: ['escapar'] },
    { word: 'testing', translations: ['testando'] },
    { word: 'monthly', translations: ['mensalmente'] },
    { word: 'focus', translations: ['foco'] },
    { word: 'matter', translations: ['matéria'] },
    { word: 'kind', translations: ['amável'] },
    { word: 'wear', translations: ['vestir', 'desgaste'] },
    { word: 'guard', translations: ['proteger'] },
    { word: 'terms', translations: ['período'] }
  ],
  
  day_52: [
    { word: 'wordy', translations: ['prolixo', 'verboso'] },
    { word: 'demand', translations: ['demanda'] },
    { word: 'man', translations: ['mano'] },
    { word: 'report', translations: ['reportar'] },
    { word: 'deliver', translations: ['entregar'] },
    { word: 'share', translations: ['ação', 'quota'] },
    { word: 'toolbar', translations: ['bar de ferramentas'] },
    { word: 'wild', translations: ['selvagem'] },
    { word: 'vehicle', translations: ['veículo'] },
    { word: 'observe', translations: ['observar'] }
  ],
  
  day_53: [
    { word: 'fly', translations: ['voar'] },
    { word: 'emerged', translations: ['emergiu'] },
    { word: 'understand', translations: ['entender'] },
    { word: 'objective', translations: ['objetivo'] },
    { word: 'top', translations: ['topo'] },
    { word: 'labor', translations: ['trabalho'] },
    { word: 'concert', translations: ['concerto'] },
    { word: 'focus', translations: ['focar'] },
    { word: 'energy', translations: ['energia'] },
    { word: 'approach', translations: ['se aproximar'] }
  ],
  
  day_54: [
    { word: 'link', translations: ['link', 'ligar'] },
    { word: 'bed', translations: ['cama'] },
    { word: 'believe', translations: ['acreditar'] },
    { word: 'frame', translations: ['quadro', 'moldura'] },
    { word: 'note', translations: ['nota'] },
    { word: 'gain', translations: ['ganhar', 'ganho'] },
    { word: 'spend', translations: ['gastar'] },
    { word: 'propose', translations: ['propôr'] },
    { word: 'marriage', translations: ['casamento'] },
    { word: 'weather', translations: ['clima', 'tempo'] }
  ],
  
  day_55: [
    { word: 'section', translations: ['seção'] },
    { word: 'project', translations: ['projetar'] },
    { word: 'matter', translations: ['importar'] },
    { word: 'lead', translations: ['liderar', 'chumbo'] },
    { word: 'defense', translations: ['defesa'] },
    { word: 'pressure', translations: ['pressão'] },
    { word: 'manager', translations: ['gerente'] },
    { word: 'impact', translations: ['impactar'] },
    { word: 'properly', translations: ['adequadamente'] },
    { word: 'player', translations: ['mulherengo'] }
  ],
  
  day_56: [
    { word: 'owner', translations: ['proprietário'] },
    { word: 'strategic', translations: ['estratégico(a)'] },
    { word: 'customer', translations: ['cliente'] },
    { word: 'variety', translations: ['variedade'] },
    { word: 'rise', translations: ['subir', 'aumento'] },
    { word: 'challenge', translations: ['desafiar'] },
    { word: 'pain', translations: ['dor'] },
    { word: 'phone', translations: ['telefone'] },
    { word: 'reality', translations: ['realidade'] },
    { word: 'physical', translations: ['físico'] }
  ],
  
  day_57: [
    { word: 'advise', translations: ['aconselhar'] },
    { word: 'something', translations: ['alguma coisa'] },
    { word: 'painter', translations: ['pintor'] },
    { word: 'space', translations: ['espaçar'] },
    { word: 'limit', translations: ['limitar'] },
    { word: 'supply', translations: ['suprimento'] },
    { word: 'start', translations: ['começar'] },
    { word: 'express', translations: ['expressar'] },
    { word: 'connect', translations: ['conectar'] },
    { word: 'speed', translations: ['velocidade'] }
  ],
  
  day_58: [
    { word: 'potential', translations: ['potencial'] },
    { word: 'credit', translations: ['creditar'] },
    { word: 'corner', translations: ['canto'] },
    { word: 'affect', translations: ['afetar'] },
    { word: 'escape', translations: ['fuga'] },
    { word: 'student', translations: ['estudante'] },
    { word: 'response', translations: ['resposta'] },
    { word: 'disappear', translations: ['desaparecer'] },
    { word: 'bus', translations: ['ônibus'] },
    { word: 'message', translations: ['mensagem'] }
  ],
  
  day_59: [
    { word: 'magazine', translations: ['revista'] },
    { word: 'green', translations: ['verde'] },
    { word: 'handed', translations: ['entregue'] },
    { word: 'argue', translations: ['argumentar'] },
    { word: 'vessel', translations: ['vaso', 'embarcação'] },
    { word: 'store', translations: ['loja', 'armazenar'] },
    { word: 'depend', translations: ['depender'] },
    { word: 'vote', translations: ['voto'] },
    { word: 'state', translations: ['estado'] },
    { word: 'photo', translations: ['foto'] }
  ],
  
  day_60: [
    { word: 'cover', translations: ['capa', 'cobrir'] },
    { word: 'domestic', translations: ['doméstico'] },
    { word: 'catch', translations: ['pegar', 'capturar'] },
    { word: 'track', translations: ['acompanhar'] },
    { word: 'chance', translations: ['chance'] },
    { word: 'size', translations: ['tamanho'] },
    { word: 'individual', translations: ['individual'] },
    { word: 'context', translations: ['contexto'] },
    { word: 'vary', translations: ['variar'] },
    { word: 'novel', translations: ['romance'] }
  ],
  
  day_61: [
    { word: 'herself', translations: ['ela mesma'] },
    { word: 'contrast', translations: ['contraste'] },
    { word: 'stand', translations: ['ficar de pé', 'suporte'] },
    { word: 'airport', translations: ['aeroporto'] },
    { word: 'debate', translations: ['debater'] },
    { word: 'seriously', translations: ['seriamente'] },
    { word: 'missing', translations: ['faltando'] },
    { word: 'appointment', translations: ['compromisso', 'nomeação'] },
    { word: 'respect', translations: ['respeito'] },
    { word: 'designer', translations: ['designer'] }
  ],
  
  day_62: [
    { word: 'encourage', translations: ['encorajar'] },
    { word: 'smile', translations: ['sorriso'] },
    { word: 'promise', translations: ['promessa'] },
    { word: 'drive', translations: ['direção'] },
    { word: 'background', translations: ['fundo', 'antecedentes'] },
    { word: 'mention', translations: ['menção', 'mencionar'] },
    { word: 'clothing', translations: ['roupa'] },
    { word: 'threaten', translations: ['ameaçar'] },
    { word: 'object', translations: ['objeto'] },
    { word: 'define', translations: ['definir'] }
  ],
  
  day_63: [
    { word: 'tour', translations: ['turnê', 'tour'] },
    { word: 'operator', translations: ['operador'] },
    { word: 'row', translations: ['fila'] },
    { word: 'product', translations: ['produto'] },
    { word: 'union', translations: ['união', 'sindicato'] },
    { word: 'expert', translations: ['pertio', 'especialista'] },
    { word: 'driven', translations: ['motivado(a)'] },
    { word: 'throw', translations: ['jogar'] },
    { word: 'park', translations: ['estacionar'] },
    { word: 'trial', translations: ['julgamento'] }
  ],
  
  day_64: [
    { word: 'speech', translations: ['discurso'] },
    { word: 'store', translations: ['loja'] },
    { word: 'cost', translations: ['custo'] },
    { word: 'success', translations: ['sucesso'] },
    { word: 'cut', translations: ['cortar', 'corte'] },
    { word: 'elect', translations: ['eleger'] },
    { word: 'every', translations: ['todo', 'cada'] },
    { word: 'central', translations: ['central'] },
    { word: 'scientist', translations: ['cientista'] },
    { word: 'please', translations: ['por favor', 'agradar'] }
  ],
  
  day_65: [
    { word: 'independent', translations: ['independente'] },
    { word: 'blood', translations: ['sangue'] },
    { word: 'decide', translations: ['decidir'] },
    { word: 'education', translations: ['educação'] },
    { word: 'religion', translations: ['religião'] },
    { word: 'unfriend', translations: ['deixar de ser amigo'] },
    { word: 'agenct', translations: ['agente'] },
    { word: 'missing', translations: ['desaparecido(a)'] },
    { word: 'natural', translations: ['natural'] },
    { word: 'stock', translations: ['estoque', 'ação'] }
  ],
  
  day_66: [
    { word: 'successful', translations: ['bem sucedido'] },
    { word: 'plant', translations: ['planta', 'fábrica'] },
    { word: 'prize', translations: ['prêmio'] },
    { word: 'size', translations: ['medir', 'ordenar por tamanho'] },
    { word: 'clearly', translations: ['claramente'] },
    { word: 'describe', translations: ['descrever'] },
    { word: 'player', translations: ['jogador'] },
    { word: 'especially', translations: ['especialmente'] },
    { word: 'fair', translations: ['justo(a)'] },
    { word: 'record', translations: ['gravar'] }
  ],
  
  day_67: [
    { word: 'pick', translations: ['escolher', 'pegar'] },
    { word: 'wear', translations: ['vestir', 'desgaste'] },
    { word: 'special', translations: ['especial'] },
    { word: 'spaced', translations: ['espaçado'] },
    { word: 'ground', translations: ['chão', 'terra'] },
    { word: 'form', translations: ['forma', 'formulário'] },
    { word: 'support', translations: ['apoiar'] },
    { word: 'official', translations: ['oficial'] },
    { word: 'whose', translations: ['cujo'] },
    { word: 'everyone', translations: ['todos'] }
  ],
  
  day_68: [
    { word: 'center', translations: ['centro'] },
    { word: 'site', translations: ['site'] },
    { word: 'end', translations: ['terminar'] },
    { word: 'hit', translations: ['bater', 'acertar'] },
    { word: 'base', translations: ['fundamentar', 'embasear'] },
    { word: 'star', translations: ['estrela'] },
    { word: 'table', translations: ['mesa'] },
    { word: 'need', translations: ['necessidade', 'precisar'] },
    { word: 'court', translations: ['tribunal', 'quadra'] },
    { word: 'produce', translations: ['produzir'] }
  ],
  
  day_69: [
    { word: 'eat', translations: ['comer'] },
    { word: 'teach', translations: ['ensinar'] },
    { word: 'oil', translations: ['óleo'] },
    { word: 'dude', translations: ['cara'] },
    { word: 'half', translations: ['metade'] },
    { word: 'easy', translations: ['fácil'] },
    { word: 'cost', translations: ['custar'] },
    { word: 'industry', translations: ['indústria'] },
    { word: 'figure', translations: ['aparência'] },
    { word: 'street', translations: ['rua'] }
  ],
  
  day_70: [
    { word: 'image', translations: ['imagem'] },
    { word: 'itself', translations: ['si mesmo'] },
    { word: 'phone', translations: ['telefonar'] },
    { word: 'either', translations: ['qualquer', 'ou'] },
    { word: 'data', translations: ['dados'] },
    { word: 'cover', translations: ['cobrir', 'cobertura'] },
    { word: 'quite', translations: ['bastante', 'completamente'] },
    { word: 'picture', translations: ['ideia'] },
    { word: 'clear', translations: ['claro', 'limpar'] },
    { word: 'practical', translations: ['prático(a)'] }
  ],
  
  day_71: [
    { word: 'piece', translations: ['peça'] },
    { word: 'land', translations: ['terra', 'aterrissar'] },
    { word: 'care', translations: ['ligar', 'cuidar'] },
    { word: 'recent', translations: ['recente'] },
    { word: 'doctor', translations: ['médico'] },
    { word: 'explain', translations: ['explicar'] },
    { word: 'got', translations: ['obtido', 'conseguido'] },
    { word: 'attack', translations: ['ataque', 'atacar'] },
    { word: 'nature', translations: ['natureza'] },
    { word: 'exist', translations: ['existir'] }
  ],
  
  day_72: [
    { word: 'term', translations: ['termo'] },
    { word: 'view', translations: ['ver', 'visualizar'] },
    { word: 'won\'t', translations: ['não vai (contração de will not)'] },
    { word: 'chair', translations: ['cadeira'] },
    { word: 'danger', translations: ['perigo'] },
    { word: 'fruit', translations: ['fruta'] },
    { word: 'rich', translations: ['rico'] },
    { word: 'thick', translations: ['grosso'] },
    { word: 'soldier', translations: ['soldado'] },
    { word: 'operate', translations: ['operar'] }
  ],
  
  day_73: [
    { word: 'guess', translations: ['adivinhar', 'suposição'] },
    { word: 'necessary', translations: ['necessário'] },
    { word: 'sharp', translations: ['afiado', 'agudo'] },
    { word: 'wing', translations: ['asa'] },
    { word: 'create', translations: ['criar'] },
    { word: 'neighbor', translations: ['vizinho'] },
    { word: 'wash', translations: ['lavar'] },
    { word: 'rather', translations: ['preferivelmente', 'bastante'] },
    { word: 'corn', translations: ['milho'] },
    { word: 'rate', translations: ['taxa', 'avaliação'] }
  ],
  
  day_74: [
    { word: 'compare', translations: ['comparar'] },
    { word: 'poem', translations: ['poema'] },
    { word: 'string', translations: ['corda', 'string (em programação)'] },
    { word: 'bell', translations: ['sino', 'campainha'] },
    { word: 'depend', translations: ['depende'] },
    { word: 'meat', translations: ['carne'] },
    { word: 'rub', translations: ['esfregar'] },
    { word: 'tube', translations: ['tubo'] },
    { word: 'famous', translations: ['famoso'] },
    { word: 'dollar', translations: ['dólar'] }
  ],
  
  day_75: [
    { word: 'stream', translations: ['corrente', 'stream (em streaming)'] },
    { word: 'fear', translations: ['medo'] },
    { word: 'sight', translations: ['vista', 'avistar'] },
    { word: 'thin', translations: ['fino'] },
    { word: 'triangle', translations: ['triângulo'] },
    { word: 'planet', translations: ['planeta'] },
    { word: 'hurry', translations: ['pressa', 'apressar-se'] },
    { word: 'chief', translations: ['chefe'] },
    { word: 'colony', translations: ['colônia'] },
    { word: 'clock', translations: ['relógio'] }
  ],
  
  day_76: [
    { word: 'mine', translations: ['meu', 'mina'] },
    { word: 'wrongful', translations: ['injust'] },
    { word: 'tie', translations: ['gravata', 'atar'] },
    { word: 'enter', translations: ['entrar'] },
    { word: 'major', translations: ['major', 'principal'] },
    { word: 'fresh', translations: ['fresco'] },
    { word: 'search', translations: ['busca', 'procurar'] },
    { word: 'send', translations: ['enviar'] },
    { word: 'yellow', translations: ['amarelo'] },
    { word: 'gun', translations: ['arma de fogo'] }
  ],
  
  day_77: [
    { word: 'allow', translations: ['permitir'] },
    { word: 'print', translations: ['impressão', 'imprimir'] },
    { word: 'dead', translations: ['morto'] },
    { word: 'spot', translations: ['mancha', 'local'] },
    { word: 'desert', translations: ['deserto', 'abandonar'] },
    { word: 'suit', translations: ['terno'] },
    { word: 'current', translations: ['atual', 'corrente'] },
    { word: 'lift', translations: ['levantar', 'elevador'] },
    { word: 'rose', translations: ['rosa', 'subiu'] },
    { word: 'arrive', translations: ['chegar'] }
  ],
  
  day_78: [
    { word: 'master', translations: ['mestre', 'dominar'] },
    { word: 'track', translations: ['pista', 'trilha'] },
    { word: 'parent', translations: ['criar', 'cuidar'] },
    { word: 'himself', translations: ['ele mesmo'] },
    { word: 'shore', translations: ['costa'] },
    { word: 'divide', translations: ['dividir'] },
    { word: 'sheet', translations: ['folha', 'lençol'] },
    { word: 'substance', translations: ['substância'] },
    { word: 'favor', translations: ['favor'] },
    { word: 'connection', translations: ['conexão'] }
  ],
  
  day_79: [
    { word: 'post', translations: ['posto', 'postar'] },
    { word: 'spend', translations: ['passar'] },
    { word: 'chord', translations: ['acorde'] },
    { word: 'fat', translations: ['gordo', 'gordura'] },
    { word: 'glad', translations: ['contente'] },
    { word: 'original', translations: ['original'] },
    { word: 'share', translations: ['partilhar'] },
    { word: 'station', translations: ['estação'] },
    { word: 'dad', translations: ['pai'] },
    { word: 'bread', translations: ['pão'] }
  ],
  
  day_80: [
    { word: 'sponsor', translations: ['patrocinar', 'apadrinhar'] },
    { word: 'charge', translations: ['carregar'] },
    { word: 'proper', translations: ['adequado'] },
    { word: 'bar', translations: ['bar', 'barra'] },
    { word: 'offer', translations: ['oferecer'] },
    { word: 'segment', translations: ['segmento'] },
    { word: 'slave', translations: ['escravo'] },
    { word: 'proposal', translations: ['proposta'] },
    { word: 'duck', translations: ['pato', 'desviar-se'] },
    { word: 'instant', translations: ['instantâneo'] }
  ],
  
  day_81: [
    { word: 'skin', translations: ['capa'] },
    { word: 'market', translations: ['mercado'] },
    { word: 'degree', translations: ['grau', 'diploma'] },
    { word: 'populate', translations: ['povoar'] },
    { word: 'chick', translations: ['pintinho', 'garota'] },
    { word: 'dear', translations: ['querido', 'caro'] },
    { word: 'enemy', translations: ['inimigo'] },
    { word: 'reply', translations: ['resposta', 'responder'] },
    { word: 'drink', translations: ['bebida', 'beber'] },
    { word: 'occur', translations: ['ocorrer'] }
  ],
  
  day_82: [
    { word: 'groupie', translations: ['tiete'] },
    { word: 'support', translations: ['suporte', 'apoio'] },
    { word: 'speechless', translations: ['sem palavras'] },
    { word: 'range', translations: ['variar'] },
    { word: 'steam', translations: ['vapor'] },
    { word: 'motion', translations: ['movimento'] },
    { word: 'path', translations: ['caminho'] },
    { word: 'liquid', translations: ['líquido'] },
    { word: 'log', translations: ['registro', 'tronco'] },
    { word: 'meant', translations: ['significava (do verbo to mean – significar)'] }
  ],
  
  day_83: [
    { word: 'quotient', translations: ['quociente'] },
    { word: 'teeth', translations: ['dentes'] },
    { word: 'shell', translations: ['concha', 'casca'] },
    { word: 'wish', translations: ['quem dera'] },
    { word: 'sue', translations: ['processar', 'pleitear'] },
    { word: 'neck', translations: ['pescoço'] },
    { word: 'oxygen', translations: ['oxigênio'] },
    { word: 'sugar', translations: ['açúcar'] },
    { word: 'death', translations: ['morte'] },
    { word: 'pretty', translations: ['bonito', 'bastante'] }
  ],
  
  day_84: [
    { word: 'skill', translations: ['habilidade'] },
    { word: 'women', translations: ['mulheres'] },
    { word: 'season', translations: ['estação', 'temporada'] },
    { word: 'magnet', translations: ['ímã'] },
    { word: 'silver', translations: ['prata', 'argêntea'] },
    { word: 'branch', translations: ['ramo', 'filial'] },
    { word: 'match', translations: ['combinar', 'partida'] },
    { word: 'suffix', translations: ['sufixo'] },
    { word: 'specialty', translations: ['especialidade'] },
    { word: 'fig', translations: ['figo'] }
  ],
  
  day_85: [
    { word: 'afraid', translations: ['com medo'] },
    { word: 'huge', translations: ['enorme'] },
    { word: 'sister', translations: ['irmã'] },
    { word: 'steel', translations: ['aço'] },
    { word: 'discuss', translations: ['discutir'] },
    { word: 'forward', translations: ['para a frente', 'adiantado'] },
    { word: 'similar', translations: ['similar'] },
    { word: 'guide', translations: ['guia', 'orientar'] },
    { word: 'experiment', translations: ['experimentar'] },
    { word: 'score', translations: ['pontuação', 'marcar'] }
  ],
  
  day_86: [
    { word: 'apple', translations: ['maçã'] },
    { word: 'bought', translations: ['comprou (do verbo to buy – comprar)'] },
    { word: 'led', translations: ['conduziu (do verbo to lead – conduzir)', 'LED (diodo emissor de luz)'] },
    { word: 'pitch', translations: ['arremesso', 'tom'] },
    { word: 'coat', translations: ['casaco', 'cobrir'] },
    { word: 'mass', translations: ['massa', 'missa'] },
    { word: 'card', translations: ['carta', 'cartão'] },
    { word: 'band', translations: ['banda', 'faixa'] },
    { word: 'app', translations: ['aplicativo'] },
    { word: 'rope', translations: ['corda'] }
  ],
  
  day_87: [
    { word: 'slip', translations: ['escorregar', 'deslizamento'] },
    { word: 'win', translations: ['ganhar', 'vitória'] },
    { word: 'dream', translations: ['sonhar', 'sonho'] },
    { word: 'evening', translations: ['noite', 'véspera'] },
    { word: 'condition', translations: ['condição'] },
    { word: 'feed', translations: ['alimentar'] },
    { word: 'total', translations: ['total', 'totalizar'] },
    { word: 'basic', translations: ['básico'] },
    { word: 'smell', translations: ['cheirar', 'cheiro'] },
    { word: 'valley', translations: ['vale'] }
  ],
  
  day_88: [
    { word: 'nor', translations: ['nem'] },
    { word: 'double', translations: ['duplo', 'duplicar'] },
    { word: 'seat', translations: ['assento', 'sentar'] },
    { word: 'continue', translations: ['continuar'] },
    { word: 'oppose', translations: ['se opôr'] },
    { word: 'block', translations: ['bloco'] },
    { word: 'chart', translations: ['gráfico', 'tabela'] },
    { word: 'hat', translations: ['chapéu'] },
    { word: 'sell', translations: ['vender'] },
    { word: 'succeed', translations: ['suceder'] }
  ],
  
  day_89: [
    { word: 'subtract', translations: ['subtrair'] },
    { word: 'particular', translations: ['particular', 'específico'] },
    { word: 'swim', translations: ['nadar'] },
    { word: 'opposite', translations: ['oposto', 'contrário'] },
    { word: 'wife', translations: ['esposa'] },
    { word: 'shoe', translations: ['sapato'] },
    { word: 'shoulder', translations: ['ombro'] },
    { word: 'spread', translations: ['espalhar', 'propagação'] },
    { word: 'arrange', translations: ['arranjar', 'organizar'] },
    { word: 'camp', translations: ['acampar'] }
  ],
  
  day_90: [
    { word: 'invent', translations: ['inventar'] },
    { word: 'cotton', translations: ['algodão'] },
    { word: 'born', translations: ['nascido'] },
    { word: 'determine', translations: ['determinar'] },
    { word: 'quart', translations: ['quarto (medida de volume nos EUA)'] },
    { word: 'nine', translations: ['nove'] },
    { word: 'truck', translations: ['caminhão'] },
    { word: 'noise', translations: ['barulho'] },
    { word: 'level', translations: ['nivelar'] },
    { word: 'gather', translations: ['reunir', 'coletar'] }
  ],
  
  day_91: [
    { word: 'shop', translations: ['loja', 'fazer compras'] },
    { word: 'stretch', translations: ['esticar', 'alongamento'] },
    { word: 'throw', translations: ['jogada'] },
    { word: 'shine', translations: ['brilhar', 'brilho'] },
    { word: 'column', translations: ['coluna'] },
    { word: 'drunk', translations: ['bêbado(a)', 'embriagado(a)'] },
    { word: 'molecule', translations: ['molécula'] },
    { word: 'select', translations: ['selecionar'] },
    { word: 'wrong', translations: ['errado'] },
    { word: 'gray', translations: ['cinza'] }
  ],
  
  day_92: [
    { word: 'repeat', translations: ['repetir'] },
    { word: 'require', translations: ['exigir'] },
    { word: 'broad', translations: ['amplo', 'largo'] },
    { word: 'prepare', translations: ['preparar'] },
    { word: 'salt', translations: ['sal'] },
    { word: 'nose', translations: ['nariz'] },
    { word: 'plural', translations: ['plural'] },
    { word: 'anger', translations: ['raiva'] },
    { word: 'claim', translations: ['reivindicar', 'reclamar'] },
    { word: 'continent', translations: ['continente'] }
  ],
  
  day_93: [
    { word: 'skin', translations: ['pele'] },
    { word: 'oxygen', translations: ['oxigênio'] },
    { word: 'sugar', translations: ['açúcar'] },
    { word: 'death', translations: ['morte'] },
    { word: 'pretty', translations: ['bonito', 'bastante'] },
    { word: 'skill', translations: ['habilidade'] },
    { word: 'womanlike', translations: ['de aspecto feminino'] },
    { word: 'season', translations: ['estação', 'temporada'] },
    { word: 'solute', translations: ['solvente'] },
    { word: 'magnet', translations: ['ímã'] }
  ],
  
  day_94: [
    { word: 'silver', translations: ['prata'] },
    { word: 'tank', translations: ['afundar'] },
    { word: 'branch', translations: ['ramo', 'filial'] },
    { word: 'match', translations: ['combinar', 'partida'] },
    { word: 'suffix', translations: ['sufixo'] },
    { word: 'especially', translations: ['especialmente'] },
    { word: 'fig', translations: ['figo'] },
    { word: 'afraid', translations: ['com medo'] },
    { word: 'huge', translations: ['enorme'] },
    { word: 'sister', translations: ['irmã'] }
  ],
  
  day_95: [
    { word: 'steel', translations: ['aço'] },
    { word: 'discuss', translations: ['discutir'] },
    { word: 'forward', translations: ['para a frente', 'adiantado'] },
    { word: 'similar', translations: ['similar'] },
    { word: 'guide', translations: ['guia', 'orientar'] },
    { word: 'experienced', translations: ['experiente'] },
    { word: 'score', translations: ['pontuação', 'marcar'] },
    { word: 'apple', translations: ['maçã'] },
    { word: 'bought', translations: ['comprou (do verbo to buy – comprar)'] },
    { word: 'led', translations: ['conduziu (do verbo to lead – conduzir)', 'LED (diodo emissor de luz)'] }
  ],
  
  day_96: [
    { word: 'pitch', translations: ['arremesso', 'tom'] },
    { word: 'coat', translations: ['casaco', 'cobrir'] },
    { word: 'mass', translations: ['massa', 'missa'] },
    { word: 'card', translations: ['carta', 'cartão'] },
    { word: 'band', translations: ['banda', 'faixa'] },
    { word: 'rope', translations: ['corda'] },
    { word: 'slip', translations: ['escorregar', 'deslizamento'] },
    { word: 'win', translations: ['ganhar', 'vitória'] },
    { word: 'dream', translations: ['sonhar', 'sonho'] },
    { word: 'evening', translations: ['noite', 'véspera'] }
  ],
  
  day_97: [
    { word: 'feed', translations: ['alimentação'] },
    { word: 'total', translations: ['total', 'totalizar'] },
    { word: 'basic', translations: ['básico'] },
    { word: 'smell', translations: ['cheirar', 'cheiro'] },
    { word: 'valley', translations: ['vale'] },
    { word: 'nor', translations: ['nem'] },
    { word: 'double', translations: ['duplo', 'duplicar'] },
    { word: 'seat', translations: ['assento', 'sentar'] },
    { word: 'continue', translations: ['continuar'] },
    { word: 'block', translations: ['bloquear'] }
  ],
  
  day_98: [
    { word: 'chart', translations: ['gráfico', 'tabela'] },
    { word: 'hat', translations: ['chapéu'] },
    { word: 'sell', translations: ['vender'] },
    { word: 'subtract', translations: ['subtrair'] },
    { word: 'particular', translations: ['particular', 'específico'] },
    { word: 'swim', translations: ['nadar'] },
    { word: 'opposites', translations: ['opostos (pessoas)'] },
    { word: 'wife', translations: ['esposa'] },
    { word: 'shoe', translations: ['sapato'] },
    { word: 'sea', translations: ['mar'] }
  ],
  
  day_99: [
    { word: 'shoulder', translations: ['ombro'] },
    { word: 'spread', translations: ['espalhar', 'propagação'] },
    { word: 'arrangement', translations: ['arranjo'] },
    { word: 'invent', translations: ['inventar'] },
    { word: 'cotton', translations: ['algodão'] },
    { word: 'born', translations: ['nascido'] },
    { word: 'determine', translations: ['determinar'] },
    { word: 'quart', translations: ['quarto (medida de volume nos EUA)'] },
    { word: 'nine', translations: ['nove'] },
    { word: 'pet', translations: ['fazer carinho'] }
  ],
  
  day_100: [
    { word: 'truck', translations: ['caminhão'] },
    { word: 'noise', translations: ['barulho'] },
    { word: 'gather', translations: ['reunir', 'coletar'] },
    { word: 'shop', translations: ['loja', 'fazer compras'] },
    { word: 'stretched', translations: ['alongado(a)'] },
    { word: 'shine', translations: ['brilhar', 'brilho'] },
    { word: 'column', translations: ['coluna'] },
    { word: 'molecule', translations: ['molécula'] },
    { word: 'select', translations: ['selecionar'] },
    { word: 'catalyst', translations: ['catalisador'] }
  ]
};


// Obtém o último dia disponível no vocabulário
export const getLastAvailableDay = (): number => {
  const days = Object.keys(vocabularyByDay)
    .map(key => parseInt(key.replace('day_', '')))
    .sort((a, b) => a - b);
  
  return days[days.length - 1] || 0;
};

// Obtém palavras para um dia específico
export const getWordsForDay = (day: number): VocabularyEntry[] => {
  const dayKey = `day_${day}`;
  return vocabularyByDay[dayKey] || [];
};

/**
 * Cria um conjunto inicial de palavras para o aplicativo
 * Carrega todas as palavras do vocabulário organizado por dia
 * Usa a versão síncrona do generateUUID para facilitar o uso
 */
export const createInitialWords = (): Word[] => {
  const words: Word[] = [];
  
  // Obtém o número do último dia disponível
  const lastDay = getLastAvailableDay();
  
  // Processa cada dia
  for (let day = 1; day <= lastDay; day++) {
    const dayWords = getWordsForDay(day);
    
    // Adiciona cada palavra do dia
    dayWords.forEach(({ word, translations }) => {
      words.push({
        id: generateUUIDSync(), // Usa a versão síncrona
        word: word,
        translation: translations.join(', '), // Junta as traduções com vírgula
        learned: false,
        learningDate: null,
        reviewInterval: 0,
        nextReviewDate: null,
        day: day // Armazena o dia a que pertence
      });
    });
  }
  
  return words;
};

/**
 * Obtém palavras para o próximo dia de aprendizado
 * baseado no último dia concluído pelo usuário
 */
export const getNextDayWords = (lastCompletedDay: number): Word[] => {
  const nextDay = lastCompletedDay + 1;
  const dayWords = getWordsForDay(nextDay);
  
  return dayWords.map(({ word, translations }) => ({
    id: generateUUIDSync(), // Usa a versão síncrona
    word: word,
    translation: translations.join(', '),
    learned: false,
    learningDate: null,
    reviewInterval: 0,
    nextReviewDate: null,
    day: nextDay
  }));
};

/**
 * Formata uma data para exibição
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString();
};