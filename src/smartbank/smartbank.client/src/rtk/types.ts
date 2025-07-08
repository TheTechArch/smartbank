export type ServiceResource = {
    identifier: string;
    version?: string;
    title: Record<string, string>;
    description: Record<string, string>;
    rightDescription?: Record<string, string>;
    homepage?: string;
    status?: string;
    spatial?: string[];
    contactPoints: ContactPoint[];
    produces?: string[];
    isPartOf?: string;
    thematicAreas?: string[];
    resourceReferences?: ResourceReference[];
    delegable: boolean;
    visible: boolean;
    hasCompetentAuthority: CompetentAuthority;
    keywords?: Keyword[];
    accessListMode: string;
    selfIdentifiedUserEnabled: boolean;
    enterpriseUserEnabled: boolean;
    resourceType: string;
    availableForType?: string[];
    authorizationReference?: AuthorizationReferenceAttribute[];
    consentTemplate?: string;
    consentText?: Record<string, string>;
    consentMetadata?: Record<string, ConsentMetadata>;
    isOneTimeConsent: boolean;
};

export type ContactPoint = {
    category: string;
    email: string;
    telephone: string;
    contactPage: string;
};

export type ResourceReference = {
    referenceSource?: string;
    reference?: string;
    referenceType?: string;
};

export type CompetentAuthorityReference = {
    organization: string;
    orgcode: string;
};

export type CompetentAuthority = CompetentAuthorityReference & {
    name: Record<string, string>;
};

export type Keyword = {
    word: string;
    language: string;
};

export type ConsentMetadata = {
    optional: boolean;
};

export type AuthorizationReferenceAttribute = {
    id: string;
    value: string;
};
