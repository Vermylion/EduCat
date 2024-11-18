from main import *
from oauth import *

import datetime
from pathlib import Path
import json

config = authenticate_user('Lycée International Victor Hugo')


def get Ho

Skolengo.fromConfigObject(config).then(async user => {
  const startDate = new Date().toISOString().split('T')[0] // Aujourd'hui
  const endDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1e3).toISOString().split('T')[0] // Aujourd'hui + 15 jours
  const homework = await user.getHomeworkAssignments(user.getTokenClaims().sub, startDate, endDate)

  document.body.innerHTML = "<p>Voici les exercices à faire pour les 2 prochaines semaines :<br>" + homework + "</p>";
}).catch((error) => {
  console.error('Erreur lors de la récupération des devoirs:', error);
});