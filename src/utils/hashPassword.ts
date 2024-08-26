import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const myPlaintextPassword = password;
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt);
    return hash;
  } catch (error) {
    throw new Error("Erreur lors du hachage du mot de passe");
  }
}

/* const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

(async () => {
  // Technique 1 (generate a salt and hash on separate function calls):
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);
  // Store hash in your password DB.

  // Technique 2 (auto-gen a salt and hash):
  const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
  // Store hash in your password DB.
})(); */
