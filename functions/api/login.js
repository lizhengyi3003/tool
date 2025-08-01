export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const formData = await context.request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const sql = `
    SELECT password FROM account
    WHERE phone_number = ? OR mail = ? OR name = ?
    LIMIT 1
  `;
  const user = await context.env.mysql.prepare(sql).bind(username, username, username).first();

  let login_status = 'FAUSE';
  if (user && user.password === password) {
    login_status = 'TRUE';
  }

  return new Response(login_status, { status: 200 });
}