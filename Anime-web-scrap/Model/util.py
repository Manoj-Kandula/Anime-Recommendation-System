import pickle,sys
with open('anime_Recommender.pickle','rb') as file:
    data = pickle.load(file)
    knn = data['knn']
    features_scaled = data['features_scaled']
    data1 = data['data1']
def recommend_anime(anime_name):
    anime_id = data1[data1['name'] == anime_name].iloc[0, 0]
    anime_features = features_scaled[anime_id - 1].reshape(1, -1)
    distances, indices = knn.kneighbors(anime_features)
    similar_anime_ids = indices.flatten()[1:]
    similar_anime = data1.loc[similar_anime_ids,'name']
    similar_anime = similar_anime.tolist()
    print(similar_anime)
n = sys.argv[1]
recommend_anime(n)