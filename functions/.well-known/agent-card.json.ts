interface Env {
  [key: string]: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const origin = (context.env?.SITE_URL || new URL(context.request.url).origin).replace(/\/$/, '');
  const card = {
    "$schema": "https://a2a-protocol.org/schemas/agent-card-v1.json",
    "name": "Site AI Publishing & Service Agent",
    "description": "Niche-agnostic intelligent AI agent providing article discovery, public opinion submissions, and classified ads marketplace capabilities.",
    "version": "1.0.0",
    "url": origin,
    "capabilities": {
      "streaming": true,
      "push": true,
      "stateful": false,
      "search": true,
      "submission": true
    },
    "skills_ref": `${origin}/.well-known/skills.json`,
    "mcp_ref": `${origin}/.well-known/mcp-server.json`,
    "bot_auth_ref": `${origin}/.well-known/web-bot-auth.json`,
    "webmcp_ref": `${origin}/.well-known/webmcp.json`,
    "endpoints": {
      "api_catalog": `${origin}/.well-known/api-catalog`,
      "oauth_authorization": `${origin}/.well-known/oauth-authorization-server`,
      "oauth_protected": `${origin}/.well-known/oauth-protected-resource`,
      "posts_api": `${origin}/api/posts`,
      "surat_pembaca_api": `${origin}/api/surat-pembaca`,
      "iklan_baris_api": `${origin}/api/iklan-baris`
    }
  };

  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
