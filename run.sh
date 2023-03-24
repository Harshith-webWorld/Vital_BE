npm run build;
cd dist;
forever stop tvsMedical;
forever start --uid tvsMedical --append true -c "node index.js" ./;
cd ..;