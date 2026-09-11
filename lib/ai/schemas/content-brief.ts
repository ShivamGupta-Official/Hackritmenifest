export const ContentBriefSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    hook: { type: "string", description: "The first 3 seconds scroll-stopper" },
    keyTakeaways: { 
      type: "array", 
      items: { type: "string" }
    },
    targetAudience: { type: "string" },
    callToAction: { type: "string" }
  },
  required: ["title", "hook", "keyTakeaways", "targetAudience", "callToAction"],
  additionalProperties: false
};

export const CampaignDiagnosisSchema = {
  type: "object",
  properties: {
    bottleneck: { type: "string", enum: ["creative", "landing_page", "audience"] },
    evidence: { type: "string" },
    recommendation: { type: "string" }
  },
  required: ["bottleneck", "evidence", "recommendation"],
  additionalProperties: false
};
